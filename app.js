const itemForm = document.getElementById('itemForm')
const itemsList = document.getElementById('list')
const countSummary = document.getElementById('countSummary')
const searchInput = document.getElementById('search')
const sortSelect = document.getElementById('sort')
const tabs = document.querySelectorAll('.tab')
const exportBtn = document.getElementById('exportBtn')
const clearBtn = document.getElementById('clearBtn')
const resetBtn = document.getElementById('resetBtn')

let currentFilter = 'all'
let currentSearch = ''
let currentSort = 'newest'

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  checkAuth()
  loadItems()
  setupEventListeners()
})

// Check authentication
async function checkAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = 'login.html'
      return
    }
    console.log('User authenticated:', session.user.email)
  } catch (error) {
    console.error('Auth check failed:', error)
    window.location.href = 'login.html'
  }
}

function setupEventListeners() {
  // Form submission
  itemForm.addEventListener('submit', handleSubmit)
  
  // Search and filter
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value
    loadItems()
  })
  
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value
    loadItems()
  })
  
  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      currentFilter = tab.dataset.filter
      loadItems()
    })
  })
  
  // Buttons
  exportBtn.addEventListener('click', exportData)
  clearBtn.addEventListener('click', clearAllItems)
  resetBtn.addEventListener('click', resetForm)
  
  // Photo preview
  document.getElementById('photo').addEventListener('change', handlePhotoPreview)
  
  // Set today's date as default
  document.getElementById('date').valueAsDate = new Date()
}

async function handleSubmit(e) {
  e.preventDefault()
  
  // Check authentication first
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    alert('Please log in to submit an item.')
    window.location.href = 'login.html'
    return
  }

  const submitBtn = document.getElementById('submitBtn')
  const originalText = submitBtn.textContent
  
  try {
    submitBtn.textContent = 'Submitting...'
    submitBtn.disabled = true
    
    const itemData = {
      type: document.getElementById('type').value,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value || new Date().toISOString().split('T')[0],
      reward: document.getElementById('reward').value ? parseFloat(document.getElementById('reward').value) : null,
      contact: document.getElementById('contact').value,
      status: 'active',
      user_id: session.user.id,
      user_email: session.user.email
    }
    
    // Upload photo if selected
    const photoFile = document.getElementById('photo').files[0]
    if (photoFile) {
      const photoUrl = await uploadPhoto(photoFile, session.user.id)
      itemData.photo_url = photoUrl
    }
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('items')
      .insert([itemData])
      .select()
    
    if (error) throw error
    
    // Check for matches with existing items
    if (data && data[0]) {
      await checkForMatches(data[0])
    }
    
    // Reset form and reload items
    resetForm()
    loadItems()
    
    showMessage('Item submitted successfully!', 'success')
  } catch (error) {
    console.error('Error submitting item:', error)
    showMessage('Error submitting item: ' + getErrorMessage(error), 'error')
  } finally {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }
}

async function uploadPhoto(file, userId) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('item-photos')
      .upload(fileName, file)
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('item-photos')
      .getPublicUrl(fileName)
    
    return publicUrl
  } catch (error) {
    console.error('Error uploading photo:', error)
    throw new Error('Failed to upload photo: ' + getErrorMessage(error))
  }
}

async function loadItems() {
  try {
    let query = supabase
      .from('items')
      .select('*')
    
    // Apply filter
    if (currentFilter !== 'all') {
      if (currentFilter === 'claimed') {
        query = query.eq('status', 'claimed')
      } else {
        query = query.eq('type', currentFilter).eq('status', 'active')
      }
    } else {
      query = query.eq('status', 'active')
    }
    
    // Apply search
    if (currentSearch) {
      query = query.or(`title.ilike.%${currentSearch}%,description.ilike.%${currentSearch}%,contact.ilike.%${currentSearch}%`)
    }
    
    // Apply sort
    if (currentSort === 'newest') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: true })
    }
    
    const { data: items, error } = await query
    
    if (error) throw error
    
    displayItems(items || [])
    updateSummary(items || [])
  } catch (error) {
    console.error('Error loading items:', error)
    itemsList.innerHTML = '<div class="error">Error loading items: ' + getErrorMessage(error) + '</div>'
  }
}

function displayItems(items) {
  if (items.length === 0) {
    itemsList.innerHTML = '<div class="no-items">No items found</div>'
    return
  }
  
  itemsList.innerHTML = items.map(item => `
    <div class="list-item" data-id="${item.id}">
      <div style="display:flex;gap:12px">
        ${item.photo_url ? `
          <img src="${item.photo_url}" alt="${item.title}" 
               style="width:60px;height:60px;object-fit:cover;border-radius:6px" />
        ` : '<div style="width:60px;height:60px;background:#f0f0f0;border-radius:6px;display:flex;align-items:center;justify-content:center;">📷</div>'}
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="tag ${item.type}">${item.type}</span>
          </div>
          <div class="muted">${escapeHtml(item.description || 'No description')}</div>
          <div style="display:flex;gap:12px;font-size:0.9em;margin-top:4px;flex-wrap:wrap;">
            <span>📅 ${new Date(item.date).toLocaleDateString()}</span>
            <span>📞 ${escapeHtml(item.contact)}</span>
            ${item.reward ? `<span>💰 KSh ${item.reward}</span>` : ''}
          </div>
          ${item.user_email ? `<div style="font-size:0.8em;color:#888;margin-top:4px">Posted by: ${escapeHtml(item.user_email)}</div>` : ''}
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="claim-btn ghost" onclick="claimItem('${item.id}')">
          Mark as Claimed
        </button>
        <button class="delete-btn ghost" onclick="deleteItem('${item.id}')">
          Delete
        </button>
        ${item.type === 'found' ? `<button class="match-btn ghost" onclick="findMatchesForItem('${item.id}')" style="background:#e3f2fd;color:#1976d2;">Find Matches</button>` : ''}
      </div>
    </div>
  `).join('')
}

// MATCHING SYSTEM - IMPROVED Email Integration
async function checkForMatches(newItem) {
  try {
    // If it's a found item, look for matching lost items
    if (newItem.type === 'found') {
      const { data: lostItems, error } = await supabase
        .from('items')
        .select('*')
        .eq('type', 'lost')
        .eq('status', 'active')
        .is('notification_sent', false)
        .or(`title.ilike.%${newItem.title}%,description.ilike.%${newItem.description}%`)

      if (error) throw error

      // For each matching lost item, send notification
      for (const lostItem of lostItems) {
        await showMatchNotification(lostItem, newItem)
      }
    }
    
    // If it's a lost item, look for matching found items
    if (newItem.type === 'lost') {
      const { data: foundItems, error } = await supabase
        .from('items')
        .select('*')
        .eq('type', 'found')
        .eq('status', 'active')
        .is('notification_sent', false)
        .or(`title.ilike.%${newItem.title}%,description.ilike.%${newItem.description}%`)

      if (error) throw error

      for (const foundItem of foundItems) {
        await showMatchNotification(newItem, foundItem)
      }
    }
  } catch (error) {
    console.error('Error checking for matches:', error)
  }
}

// More reliable email notification function
async function showMatchNotification(lostItem, foundItem) {
  const emailSubject = `Match Found: ${lostItem.title}`
  const emailBody = `
Hello,

We found a potential match for your lost item!

Your Lost Item:
- ${lostItem.title}
- ${lostItem.description}
- Lost on: ${new Date(lostItem.date).toLocaleDateString()}

Matching Found Item:
- ${foundItem.title}
- ${foundItem.description}
- Found on: ${new Date(foundItem.date).toLocaleDateString()}

Contact the finder at: ${foundItem.contact}
${foundItem.reward ? `Reward: KSh ${foundItem.reward}` : ''}

Please verify the item matches your description.

Best regards,
Lost & Found Team
  `.trim()

  // Create mailto link
  const mailtoLink = `mailto:${lostItem.contact}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
  
  console.log('Mailto link created:', mailtoLink)

  // Show notification
  const userChoice = confirm(
`🎉 MATCH FOUND! 

We found "${foundItem.title}" that might match your lost item "${lostItem.title}".

We'll now try to open your email client to contact: ${lostItem.contact}

Click OK to attempt opening email, or Cancel to skip.`
  )
  
  if (userChoice) {
    // MULTIPLE METHODS TO OPEN EMAIL CLIENT
    let emailOpened = false
    
    try {
      // Method 1: Create and click a hidden link (most reliable)
      const link = document.createElement('a')
      link.href = mailtoLink
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      emailOpened = true
      console.log('Method 1: Hidden link clicked')
    } catch (error) {
      console.error('Method 1 failed:', error)
    }
    
    // Method 2: Try window.open after a short delay
    setTimeout(() => {
      if (!emailOpened) {
        try {
          const newWindow = window.open(mailtoLink, '_blank')
          if (newWindow) {
            emailOpened = true
            console.log('Method 2: Window.open succeeded')
          }
        } catch (error) {
          console.error('Method 2 failed:', error)
        }
      }
    }, 100)
    
    // Method 3: Try window.location after another delay
    setTimeout(() => {
      if (!emailOpened) {
        try {
          window.location.href = mailtoLink
          emailOpened = true
          console.log('Method 3: Window.location used')
        } catch (error) {
          console.error('Method 3 failed:', error)
        }
      }
      
      // Final fallback - always show manual option
      setTimeout(() => {
        if (!emailOpened) {
          console.log('All automatic methods failed, showing manual option')
          showManualEmailOption(lostItem, foundItem, emailSubject, emailBody)
        } else {
          // Even if email opened, show manual option as backup
          setTimeout(() => {
            showManualEmailOption(lostItem, foundItem, emailSubject, emailBody, true)
          }, 2000)
        }
      }, 500)
      
    }, 200)
    
    // Mark as notified in database
    try {
      await supabase
        .from('items')
        .update({ notification_sent: true })
        .eq('id', lostItem.id)
      console.log('Database updated: notification_sent = true')
    } catch (dbError) {
      console.error('Error updating database:', dbError)
    }
  }
}

// Updated manual email option with better messaging
function showManualEmailOption(lostItem, foundItem, subject, body, attemptedAuto = false) {
  const emailContent = `
EMAIL SUBJECT: ${subject}

EMAIL BODY:
${body}

CONTACT INFORMATION:
- Send to: ${lostItem.contact}
- Finder's contact: ${foundItem.contact}

Copy the text above and send it manually through your email client.
  `.trim()

  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `
  
  const modalContent = document.createElement('div')
  modalContent.style.cssText = `
    background: white;
    padding: 25px;
    border-radius: 10px;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  `
  
  const message = attemptedAuto 
    ? `We attempted to open your email client automatically. If it didn't work, please copy the email content below and send it manually to:`
    : `Please copy the email content below and send it manually to:`
  
  modalContent.innerHTML = `
    <h3 style="margin-top: 0; color: #2340c2ab; border-bottom: 2px solid #2340c2ab; padding-bottom: 10px;">
      ${attemptedAuto ? '📧 Email Backup Option' : '📧 Manual Email Required'}
    </h3>
    <p>${message} <strong style="color: #2340c2ab;">${lostItem.contact}</strong></p>
    
    <div style="margin: 15px 0;">
      <label style="font-weight: bold; display: block; margin-bottom: 5px;">Email Content:</label>
      <textarea 
        id="emailContent" 
        style="
          width: 100%;
          height: 300px;
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.4;
          resize: vertical;
          background: #f9f9f9;
        "
        readonly
      >${emailContent}</textarea>
    </div>
    
    <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
      <button id="copyBtn" style="
        padding: 12px 24px;
        background: #2340c2ab;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s;
      " onmouseover="this.style.background='#1a32a8'" onmouseout="this.style.background='#2340c2ab'">
        📋 Copy to Clipboard
      </button>
      <button id="closeBtn" style="
        padding: 12px 24px;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s;
      " onmouseover="this.style.background='#545b62'" onmouseout="this.style.background='#6c757d'">
        ✕ Close
      </button>
    </div>
    
    ${attemptedAuto ? `
      <div style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-radius: 6px; border-left: 4px solid #2340c2ab;">
        <strong>💡 Tip:</strong> Some browsers block automatic email opening for security reasons. 
        This manual method ensures you can still contact the owner.
      </div>
    ` : ''}
  `
  
  modal.appendChild(modalContent)
  document.body.appendChild(modal)
  
  // Add event listeners
  document.getElementById('copyBtn').addEventListener('click', () => {
    const textarea = document.getElementById('emailContent')
    textarea.select()
    
    // Use modern clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textarea.value)
        .then(() => showMessage('✅ Email content copied to clipboard!', 'success'))
        .catch(() => {
          // Fallback to execCommand
          document.execCommand('copy')
          showMessage('✅ Email content copied to clipboard!', 'success')
        })
    } else {
      // Fallback for older browsers
      document.execCommand('copy')
      showMessage('✅ Email content copied to clipboard!', 'success')
    }
  })
  
  document.getElementById('closeBtn').addEventListener('click', () => {
    document.body.removeChild(modal)
  })
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal)
    }
  })
  
  // Auto-focus the textarea for easy copying
  setTimeout(() => {
    const textarea = document.getElementById('emailContent')
    if (textarea) {
      textarea.focus()
      textarea.select()
    }
  }, 100)
}

// Manual match checking for a specific item
async function findMatchesForItem(itemId) {
  try {
    // Get the item details
    const { data: item, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', itemId)
      .single()

    if (error) throw error

    await checkForMatches(item)
  } catch (error) {
    console.error('Error finding matches:', error)
    showMessage('Error finding matches: ' + getErrorMessage(error), 'error')
  }
}

// Manual match checking for all items
async function manualMatchCheck() {
  try {
    // Get all active items that haven't been matched
    const { data: items, error } = await supabase
      .from('items')
      .select('*')
      .eq('status', 'active')
      .is('notification_sent', false)
      .order('created_at', { ascending: false })

    if (error) throw error

    let matchesFound = 0
    
    // Check for matches between lost and found items
    for (const item of items) {
      await checkForMatches(item)
      matchesFound++
    }

    showMessage(`Match check completed! Processed ${matchesFound} items.`, 'success')
  } catch (error) {
    console.error('Error in manual match check:', error)
    showMessage('Error checking matches: ' + getErrorMessage(error), 'error')
  }
}

// Add match button to UI
function addMatchButton() {
  const controls = document.querySelector('.controls')
  if (controls && !document.getElementById('matchCheckBtn')) {
    const matchBtn = document.createElement('button')
    matchBtn.id = 'matchCheckBtn'
    matchBtn.className = 'ghost'
    matchBtn.textContent = 'Check All Matches'
    matchBtn.style.marginLeft = '8px'
    matchBtn.onclick = manualMatchCheck
    controls.appendChild(matchBtn)
  }
}

// Call this in your DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  checkAuth()
  loadItems()
  setupEventListeners()
  addMatchButton()
})

async function claimItem(itemId) {
  if (!confirm('Mark this item as claimed?')) return
  
  try {
    const { error } = await supabase
      .from('items')
      .update({ status: 'claimed', updated_at: new Date().toISOString() })
      .eq('id', itemId)
    
    if (error) throw error
    
    loadItems()
    showMessage('Item marked as claimed!', 'success')
  } catch (error) {
    console.error('Error claiming item:', error)
    showMessage('Error updating item: ' + getErrorMessage(error), 'error')
  }
}

async function deleteItem(itemId) {
  if (!confirm('Delete this item permanently?')) return
  
  try {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId)
    
    if (error) throw error
    
    loadItems()
    showMessage('Item deleted successfully!', 'success')
  } catch (error) {
    console.error('Error deleting item:', error)
    showMessage('Error deleting item: ' + getErrorMessage(error), 'error')
  }
}

function updateSummary(items) {
  const total = items.length
  const lost = items.filter(item => item.type === 'lost').length
  const found = items.filter(item => item.type === 'found').length
  
  countSummary.textContent = `${total} items (${lost} lost, ${found} found)`
}

async function exportData() {
  try {
    const { data: items, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    const dataStr = JSON.stringify(items, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = 'lost-found-data.json'
    link.click()
    
    showMessage('Data exported successfully!', 'success')
  } catch (error) {
    console.error('Error exporting data:', error)
    showMessage('Error exporting data: ' + getErrorMessage(error), 'error')
  }
}

// FIXED: Clear All Items Function
async function clearAllItems() {
  if (!confirm('⚠️ This will delete ALL items permanently. Are you sure?')) return
  
  try {
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      showMessage('Please log in to clear items.', 'error')
      return
    }

    // Delete all items from Supabase
    const { error } = await supabase
      .from('items')
      .delete()
      .neq('id', 0)

    if (error) {
      console.error('Supabase delete error:', error)
      throw error
    }

    // Clear local state
    loadItems()
    showMessage('All items cleared successfully!', 'success')

  } catch (error) {
    console.error('Error clearing items:', error)
    showMessage('Error clearing items: ' + getErrorMessage(error), 'error')
  }
}

function resetForm() {
  itemForm.reset()
  document.getElementById('preview').innerHTML = ''
  document.getElementById('date').valueAsDate = new Date()
}

function handlePhotoPreview(e) {
  const file = e.target.files[0]
  const preview = document.getElementById('preview')
  
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.innerHTML = `
        <img src="${e.target.result}" alt="Preview" 
             style="max-width:200px;max-height:200px;border-radius:6px" />
        <div style="font-size:0.8em;color:#666;margin-top:4px">Photo preview</div>
      `
    }
    reader.readAsDataURL(file)
  } else {
    preview.innerHTML = ''
  }
}

function escapeHtml(unsafe) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Utility function to get proper error messages
function getErrorMessage(error) {
  if (typeof error === 'string') return error
  if (error.message) return error.message
  if (error.error) return error.error
  return 'Unknown error occurred'
}

// Show message function
function showMessage(message, type = 'success') {
  // Remove any existing messages
  const existingMessages = document.querySelectorAll('.message')
  existingMessages.forEach(msg => msg.remove())

  // Create new message
  const messageEl = document.createElement('div')
  messageEl.className = `message ${type}`
  messageEl.textContent = message
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    color: white;
    z-index: 1000;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `
  
  if (type === 'success') {
    messageEl.style.background = '#4CAF50'
  } else {
    messageEl.style.background = '#f44336'
  }

  document.body.appendChild(messageEl)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (messageEl.parentNode) {
      messageEl.parentNode.removeChild(messageEl)
    }
  }, 3000)
}

// Debug function to test email functionality
function testEmailFunction() {
  const testEmail = 'test@example.com'
  const testSubject = 'Test Email from Lost & Found'
  const testBody = 'This is a test email from the Lost & Found system to check if email functionality is working.'
  
  const mailtoLink = `mailto:${testEmail}?subject=${encodeURIComponent(testSubject)}&body=${encodeURIComponent(testBody)}`
  
  console.log('🔧 Testing email functionality...')
  console.log('Mailto link:', mailtoLink)
  
  // Test Method 1: Hidden link
  try {
    const link = document.createElement('a')
    link.href = mailtoLink
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log('✅ Method 1 (hidden link): SUCCESS')
  } catch (error) {
    console.log('❌ Method 1 (hidden link): FAILED', error)
  }
  
  // Test Method 2: Window open
  try {
    const newWindow = window.open(mailtoLink, '_blank')
    if (newWindow) {
      console.log('✅ Method 2 (window.open): SUCCESS')
    } else {
      console.log('❌ Method 2 (window.open): FAILED - Popup blocked?')
    }
  } catch (error) {
    console.log('❌ Method 2 (window.open): FAILED', error)
  }
}

// Make functions available globally for onclick handlers
window.claimItem = claimItem
window.deleteItem = deleteItem
window.findMatchesForItem = findMatchesForItem
window.manualMatchCheck = manualMatchCheck
window.showMatchNotification = showMatchNotification
window.testEmailFunction = testEmailFunction // For debugging

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = 'login.html'
  }
})