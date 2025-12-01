# reunite-the-community
LOST AND FOUND APLLICATION SYSTEM





SYDNEY MUSALIA








A research project submitted to the school of science, Engineering and Technology in partial fulfillment of the requirements for the award of Diploma in Information Technology, Kabarak university

October,2025
COPYRIGHT
©2025
All rights reserved.
No section of this project may be copied, stored or transmitted in any form whether electronic, mechanical, photocopied or otherwise without prior written authorization from the author or Kabarak University.

Signature: ____________                                                                        Date:______________
 
DECLARATION AND APPROVAL
I confirm that this project is my own original work and has not been submitted previously to the School of Science, Engineering and Technology or any other institutions for academic recognition. Reproduction of any part of this document without the permission is strictly prohibited.
Signature: _______________                                                                     Date__________________

Student: Sydney Musalia
Registration Number: DIT/N/0809/05/24
 
RECOMMEDATION
This research project titled Lost and Found Application System, prepared by Sydney Musalia, has been submitted to the School of Science, Engineering and Technology, Kabarak University. I have examined the project and hereby recommend it for acceptance as part of the requirements for the award of the Diploma in Information Technology.
Signature__________________                                     Date__________________________
Mr. Elvine Saikwa
School of Science, Engineering and Technology
Department of Computer Science and Information Technology
Kabarak University
 
ACKNOWLEDGEMENT
I am sincerely grateful to God for the gift of life, strength and guidance that have enabled me to reach this stage in my academic journey. I also thank my family and friends for their constant support, encouragement and understanding.
My heartfelt appreciation goes to my supervisor, Mr. Elvine Saikwa and all my lecturers at Kabarak University for their invaluable guidance, patience and mentorship throughout the course of this research. Your advice and dedication greatly contributed to the success of this project.

 
DEDICATION
This project is lovingly dedicated to the memory of my dearest grandmother, the late Mrs. Jane J. Chepkonga. Her love, wisdom, kindness and unwavering belief in me continue to inspire my journey every day. Though she is no longer here with us, her love remains my guiding light. 
Forever in my heart. 
 
ABSTRACT
The Lost and Found Application System is a digital solution designed to simplify the process of reporting and recovering lost items. The system allows users to create accounts, submit reports of lost or found items and search through categorized listings on an intuitive interface. It promotes transparency, efficiency and accessibility by replacing manual reporting methods with a centralized online platform, making it easier for users to reunite with their belongings.
Keywords: Lost and Found, digital system, reporting, recovery, user accounts, lost items, found items, listings, categories, search, interface, platform, transparency, efficiency, accessibility, database, belongings.
 
TABLE OF CONTENTS
COPYRIGHT	ii
RECOMMEDATION	iv
ACKNOWLEDGEMENT	v
DEDICATION	vi
ABSTRACT	vii
LIST OF FIGURES	xii
LIST OF TABLES	xiii
CHAPTER ONE	1
INTRODUCTION	1
1.1 Background	1
1.2 Problem Statement	2
1.3 Purpose of Studying	2
1.4 General Objectives	2
1.4.1 Specific Objectives	2
1.5 Research questions	2
1.6 Justification of the study	3
1.7 Scope of the Study	3
CHAPTER TWO	4
LIRERATURE REVIEW	4
2.0 Introduction	4
2.1 Record Keeping of Lost and Found Items	4
2.2 Challenges Facing Manual Record Keeping of Lost and Found Items	4
2.3 Related Works	5
2.3.1 Microsoft Excel (Spreadsheets)	5
2.3.2 Mobile Applications	5
2.3.3 Local Initiatives and Research	6
2.4 General Gaps in Existing Systems	6
CHAPTER THREE	7
RESEARCH METHODOLOGY	7
3.0 Introduction	7
3.1 System development Methodology	7
3.1.1 Requirement Analysis	7
3.1.2 Design]	8
3.1.3 Development	8
3.1.4 Testing	8
3.1.5 Maintenance	8
3.1.6 Feedback	8
3.2 Justification of Methodology	8
3.2.1 Functional Requirements	9
3.2.2 User Login and Authentication	9
3.2.3 Item Data Entry	9
3.2.4 Display of records	9
3.2.5 Record Storage	9
3.3 Non-functional requirements	9
3.3.1 Usability	9
3.3.2 Reliability	9
3.3.3 Security	9
3.4 Tools and Techniques	9
3.4.1 Visual Studio Code (Vs Code)	10
3.4.2 CSS	10
3.4.3 JavaScript	10
3.4.4 Superbase	10
3.4.5 Microsoft Word	10
3.5 Milestones and Deliverables	10
3.5.1 Lost and Found System	10
3.5.2 Administrator Module	10
3.5.3 User Manual	11
3.6 Data Collection methods and primary data collections methods	11
3.6.1 Primary Date Collection Methods	11
3.6.2 Secondary Data Collection Methods	11
3.7 Data Flow Diagram	11
3.7.1 Context Diagram-Level 0	11
CHAPTER FOUR	14
SYSTEM ANALYSIS, IMPLEMENTATION AND DESIGN	14
4.0 Introduction	14
4.1 Input Design	14
4.1.1 User Login Screen	14
4.1.2 Lost and found item entry form	15
4.1.3 Dashboard Screen	15
4.1.4 About page	16
4.1.5  Contact page	17
4.2 Description of the Implementation	18
4.2.1 Hardware Specification	18
4.2.2 Software specification	18
4.3 Description of testing and results	19
4.3.1 System Testing	19
4.3.2 Testing and Data Results	19
4.3.3 Non-Functional Requirements	19
4.4.4 Description and Results	20
CHAPTER FIVE	21
CONCLUCTION AND RECOMMENDATION	21
5.0 Introduction	21
5.1 Conclusion	21
5.2 Recommendation	21
5.3 Future Works	21
REFERENCES	22
APPENDIX	23

 
LIST OF FIGURES
Figure 1 Conceptual Framework	6
Figure 2 Agile Methodology	7
Figure 3: Level-0 diagram	12
Figure 4 DFD-Diagram	13
Figure 5 User Login	15
Figure 6 Dashboard screen	16
Figure 7About page	17
Figure 8 Contact page	18

 
LIST OF TABLES
Table 1:Testing Data and Results	19
Table 2 Non-Functional Requirements	20
 
CHAPTER ONE
INTRODUCTION
1.1 Background
A Lost and Found Application System is a digital platform designed to help individuals report, search for and recover lost or found items with ease. It replaces traditional manual methods such as physical notice boards, word of mouth or social media posts with an organized and centralized online system. According to Kamau (2025), these technology-driven platforms significantly improve efficiency by offering real-time updates and reliable tracking of reported items. The core function of such a system is to enable users to register lost or found objects, view reports from others and communicate securely to reclaim their belongings (Mwangi, n.d.).
The concept of recording lost and found items is not new; it has existed for centuries, originally handled through public announcements, local administration offices or printed notices (Wikipedia, 2025). However, with the rise of digital transformation, many institutions and organizations, including universities, airports and public transport systems, have adopted online solutions to simplify what was once a cumbersome item recovery process (Kamau, 2025).
In Kenya specifically, the need for a digital lost and found system has grown in parallel with the increasing use of mobile devices and internet access (Mwangi, n.d.). Manual tracking methods often lead to permanent lost records, miscommunication and low recovery rates, creating a clear demand for a more reliable solution (Kamau, 2025). A web-based system addresses these shortcomings by allowing users to create accounts, upload detailed item descriptions, attach images and search databases instantly, thereby enhancing the entire recovery process (Mwangi, n.d.).
This project aims to develop a Lost and Found Application System that enhances accessibility, improves communication between users and minimizes the time taken to locate lost items. By prioritizing user-friendly interaction, secure data handling and accurate categorization, the system will ensure efficiency and convenience in recovering lost property, directly addressing the gaps identified in traditional methods (Kamau, 2025; Mwangi, n.d.).
1.2 Problem Statement
The management of lost and found items plays a vital role in maintaining order and trust within communities, institutions and public spaces. However, most reporting processes still depend on manual methods such as paper logs, verbal communication or social media posts, which are inefficient and prone to errors, data loss or misinformation. This makes it difficult for individuals to locate their belongings promptly and for administrators to manage reports effectively.
A Lost and Found Application System addresses these challenges by digitizing the entire process. Users can easily report lost or found items, upload photos and search for matches through a secure online platform. The system minimizes human error, enhances record accuracy and ensures quick access to information. 
1.3 Purpose of Studying
The purpose of this study is to develop a digital platform that allows users to record and manage lost and found items online, eliminating the need for manual reporting methods. 
1.4 General Objectives
To design and develop an online Lost and Found Application System that enables users to report, track and recover lost or found items efficiently through a centralized digital platform.
1.4.1 Specific Objectives
i.	To enable quick identification and matching of lost items with found items 
ii.	To enhance communication between item finders, owners, and administrators
iii.	To streamline the reporting and recording of lost and found items
1.5 Research questions
i.	What challenges are encountered in the manual reporting and tracking of lost and found items?
ii.	What requirements are necessary for developing an effective online Lost and Found Application System?
iii.	How will the system improve the process of recovering lost items and benefit its users?
1.6 Justification of the study
The Lost and Found Application System is designed to address the inefficiencies of manual reporting methods used to record and track lost or found items. Traditional approaches, such as using notice boards or verbal communication that are often unreliable and time-consuming. This system provides a user-friendly and dependable platform where users can easily submit and view reports in real time. By digitizing the process, the system minimizes paperwork, reduces errors, enhances accessibility and improves the overall efficiency of reuniting owners with their lost belongings.
1.7 Scope of the Study
The scope of this study focuses on the design and development of a Lost and Found Application System that allows users to report, manage and track lost or found items digitally. The system provides an intuitive and user-friendly interface where users can submit item details, upload images and search for matching reports efficiently
 
CHAPTER TWO
LIRERATURE REVIEW
2.0 Introduction
This chapter analyzes the current methods for managing lost and found items, focusing on traditional systems like paper-based logs and physical notice boards (Mwangi, n.d.). It then details the significant inefficiencies of these manual approaches, including poor record-keeping, delayed communication and low recovery rates, as identified in existing literature (Kamau, 2025). By establishing these documented challenges, this chapter provides the critical justification for the proposed Lost and Found Application System, which is designed to directly address these limitations through digital centralization and real-time updates.
2.1 Record Keeping of Lost and Found Items
Efficient record keeping plays a crucial role in ensuring that lost and found items are properly tracked and returned to their rightful owners. However, many institutions and communities still rely on informal or manual methods, such as notice boards, paper logs or verbal reports, which often lead to misplaced information, delays and confusion. This lack of structured record keeping affects the efficiency of item recovery and user satisfaction.
According to Admin (2018), maintaining accurate records is an essential part of good management practices. Without a proper system, users and administrators must rely on memory or scattered notes, which can quickly become unreliable over time. Structured records, especially when items are assigned identifiers or categories, allow for easy tracking, comparison of trends and evaluation of the reporting process. Proper record keeping also helps identify gaps in the system, improves efficiency and ensures accountability in the management of lost and found item
2.2 Challenges Facing Manual Record Keeping of Lost and Found Items
Managing lost and found items manually presents several challenges. Many institutions and communities still rely on paper logs, notice boards or verbal reports to track lost or found items. This approach is time-consuming, prone to human errors and can easily result in misplaced or incomplete records. Inaccurate or lost data makes it difficult for administrators and users to efficiently locate items or identify patterns, which can reduce the overall effectiveness of the system. Effective record keeping is essential to ensure timely recovery, proper tracking and accountability and manual methods often fall short of meeting these needs.
2.3 Related Works
Traditionally, lost and found records have been maintained manually, but with technological advancements, digital solutions have started to emerge. For example, some institutions and communities now use spreadsheets, mobile apps or simple database tools to track lost and found items. These digital tools help reduce errors and improve organization compared to purely manual methods. However, they also have limitations, such as lack of real-time updates, poor user interface or difficulty in managing large volumes of records, which the proposed Lost and Found Application System aims to address.
2.3.1 Microsoft Excel (Spreadsheets)
Some institutions and organizations have adopted Microsoft Excel or similar spreadsheet tools to manage lost and found records digitally. Spreadsheets allow users to enter item details, categorize entries and generate summaries or reports easily. They help reduce errors compared to manual logs and provide basic data analysis features. However, the downside is that effective use requires a certain level of computer literacy and spreadsheets are not ideal for multi-user access or real-time updates, which can limit efficiency in busy or large-scale environments.
2.3.2 Mobile Applications
Mobile applications have also been used to manage lost and found records more efficiently. For instance, some apps allow users to submit reports of lost or found items, categorize them and track their status in real time. These apps often provide tutorials or guide to help users navigate the system and generate reports that are easy to interpret. Additionally, they can send notifications or reminders to users when updates occur, ensuring that items are not overlooked. Mobile platforms, typically available on Android or iOS devices, make the system more accessible and convenient for users (Kinuthia, 2012).
2.3.3 Local Initiatives and Research
Local initiatives have also played a role in improving lost and found management. For example, some universities, offices and community centers in Kenya have organized training sessions and awareness programs to educate staff and members on proper reporting and tracking of lost items. These programs often involve practical exercises, such as categorizing items, logging reports and matching lost and found entries, to help participants understand the process and importance of accurate record keeping. Such initiatives have demonstrated that structured training and hands-on practice can significantly improve the efficiency and reliability of lost and found operations in local settings.
2.4 General Gaps in Existing Systems
Current digital solutions for lost and found management, while helpful, still have several limitations. Many systems are either too complex for users with limited digital literacy, require constant internet access or are financially or technically inaccessible for smaller institutions or communities. Additionally, some organizations continue to rely on manual methods, which are prone to errors, misplacement of records and inefficiencies in tracking lost items. These gaps emphasize the need for a simple, reliable and user-friendly lost and found system that streamlines reporting, improves accessibility and ensures efficient item recovery.
 
Figure 1 Conceptual Framework
 
CHAPTER THREE
RESEARCH METHODOLOGY
3.0 Introduction
This chapter details the methodology for developing the Lost and Found Application System. It specifies both the functional requirements defining the core features for reporting, searching and managing items and the non-functional requirements, which ensure system quality through security, usability and performance standards (Kamau, 2025). By presenting this structured framework, the chapter establishes the foundational blueprint that guided the entire design and development process (Mwangi, n.d.).
3.1 System development Methodology
The system was developed using the Agile methodology, which emphasizes an iterative approach where requirements and solutions continuously evolve through collaboration between self-organizing, cross-functional teams and the end users.
 
Figure 2 Agile Methodology
3.1.1 Requirement Analysis
The system requirements for the Lost and Found System include enabling users to report and track lost or found items digitally. Functional requirements cover data entry, item categorization and storage while non-functional requirements emphasize system accuracy, reliability and ease of use for all users.
3.1.2 Design]
The design of the Lost and Found System was focused on solving the challenges of manual item tracking. A simple and user-friendly interface was developed to allow users to report lost or found items and view their status easily. The system structure was organized to ensure efficient data flow from reporting to display on the dashboard, making it convenient for daily use.
3.1.3 Development
The development of the Lost and Found System was carried out using superbase for the backend. The system was constructed in modules, beginning with the user login, dashboard, and lost/found item entry forms. Each module was tested incrementally to ensure proper functionality, enabling users to efficiently report, track and manage lost and found items digitally.
3.1.4 Testing
The developed Lost and Found System was tested to confirm that all features functioned correctly. The login module was examined to ensure proper user authentication, while the dashboard and item reporting forms were tested to verify accurate data entry, retrieval and display.
3.1.5 Maintenance
Maintenance refers to the ongoing process of ensuring the Lost and Found System operates smoothly after deployment. It includes detecting and correcting system errors, updating functionalities and adding new features or enhancements to improve efficiency and adapt to changing user requirements.
3.1.6 Feedback
This phase involved assessing how effectively the Lost and Found System performs within its intended environment. It focused on collecting user feedback, evaluating the system’s usability and reliability and determining how well it meets user needs and operational expectations.
3.2 Justification of Methodology
This methodology was chosen for the Lost and Found System because it provides flexibility, allowing users or clients to make small modifications without disrupting the entire development schedule. It also accommodates the evolving nature of user requirements, ensuring the system adapts effectively to changing needs and preferences.
3.2.1 Functional Requirements
This section outlines the key functionalities of the Lost and Found System, detailing the essential features that enable users to report, search and manage lost or found items efficiently.
3.2.2 User Login and Authentication
Only registered users are permitted to access the Lost and Found System through a secure login process that verifies their identity and prevents unauthorized access.
3.2.3 Item Data Entry
Users can enter records of lost and found items on a daily basis.
3.2.4 Display of records
All submitted lost and found items are shown on the dashboard.
3.2.5 Record Storage
All lost and found item records are securely stored in a database.
3.3 Non-functional requirements
3.3.1 Usability
The system is easy to learn and use. No special skills or training are needed and its simple design minimizes confusion for regular users.
3.3.2 Reliability
The system is stable and operates consistently without any crashes.
3.3.3 Security
All data is stored securely, protected against hacking attempts and other external threats.
3.4 Tools and Techniques
These are the methods used to develop the system. They involve programming languages and technologies applied to create a functional Lost and Found System.
3.4.1 Visual Studio Code (Vs Code)
This is the main code editor used to write, edit, and manage all files for the Lost and Found System. It provides extensions and debugging tools to facilitate development.
3.4.2 CSS
CSS or Cascading Style Sheets, is a language used to define how a document is presented. It was used to format and create an appealing interface for the Lost and Found System.
3.4.3 JavaScript 
JavaScript is used on the frontend to handle user input, manage interactions and dynamically update the interface. It works with the backend to perform operations like adding records, authentication and displaying data.
3.4.4 Superbase
Supa base serves as the database management system, storing all data related to lost and found items, user accounts and other system information.
3.4.5 Microsoft Word
Microsoft Word was used as a word processor for creating the system’s documentation. It helped in typing, organizing and explaining how the Lost and Found System works.
3.5 Milestones and Deliverables
This section outlines how the system and its documentation will benefit the target users.
3.5.1 Lost and Found System
The main deliverable is the application itself. The system enables users to record and manage lost and found items digitally.
3.5.2 Administrator Module
The system includes a single administrator who can access storage reports, manage user accounts on a limited basis and authenticate users. The administrator also oversees the Lost and Found System’s database.
3.5.3 User Manual
A user manual will be provided to guide users on how to operate the system and understand its functionality.
3.6 Data Collection methods and primary data collections methods
3.6.1 Primary Date Collection Methods
Selecting the right data collection method is crucial. Primary data collection involves gathering information for the first time. For this study, close-ended questionnaires and one-on-one interviews will be used. Two separate questionnaires will be prepared one for users submitting lost items and another for those reporting found items to collect quantitative data. Additionally, one-on-one interviews will help determine how effectively the system addresses the needs of both groups. The data collected will be quantitative, making it easier to analyze trends and guide the system’s development.
3.6.2 Secondary Data Collection Methods
Secondary data consists of information that has already been collected. For this study, data will be gathered from websites and online articles highlighting issues with manual record-keeping of lost and found items.
3.7 Data Flow Diagram
3.7.1 Context Diagram-Level 0
A context diagram is the first step in creating data flow diagrams (DFDs). DFDs show how data moves through a system but do not depict programming logic or processing steps. A context diagram provides a simplified overview of the Lost and Found System, illustrating its interactions with external entities.
  
Figure 3: Level-0 diagram

 
Figure 4 DFD-Diagram
 
CHAPTER FOUR
SYSTEM ANALYSIS, IMPLEMENTATION AND DESIGN
4.0 Introduction
This chapter presents the implementation of the Lost and Found System, detailing its operational components and functionality. It provides a technical overview using architectural diagrams and process models to illustrate how the system manages information flow and user interactions (Kamau, 2025). The chapter further documents the development phase, explaining the coding standards and technologies employed and concludes with a comprehensive testing methodology designed to verify that all system requirements have been met successfully (Mwangi, n.d.).
4.1 Input Design
4.1.1 User Login Screen
The user login is the initial interface that users of the Lost and Found System encounter. It enables authorized individuals to securely access the system using a username and password. The design is straightforward and intuitive, ensuring that even users with limited technical knowledge can navigate it easily.
 
Figure 5 User Login
4.1.2 Lost and found item entry form
This screen enables users to input details of lost or found items. Users can record information such as the item name, description, date, photos and location where it was lost or found. Once submitted, the data is stored in the system’s database and can be accessed or managed through the dashboard
4.1.3 Dashboard Screen
The dashboard displays all lost and found records that have been entered into the system. It presents details such as the item name, description, date, photos and location in a clear table format, allowing users to easily view, monitor and track items over time. When someone reports a found item, the system automatically checks against all lost items. If descriptions match (like "black wallet" or "iPhone"), a popup message appears saying: "Match found! This item might belong to lost item owner's contact."
The design works on both computers and phones, with navigation to About and Contact pages. All data saves to an online database so items stay available between visits.

 
Figure 6 Dashboard screen
4.1.4 About page
The About Page of a Lost and Found System serves as an essential section that introduces users to the purpose, structure and value of the platform. It provides a clear understanding of why the system exists and the role it plays within an institution or community. At its core, the About Page explains that the system was developed to address the common challenge of misplaced personal belongings and the inefficiency of traditional manual methods of handling lost and found cases. By outlining these motivations, the page helps users appreciate the significance of the platform in improving item recovery and organization.
 
Figure 7About page
4.1.5  Contact page
The Contact Page of the Lost and Found System provides users with simple and accessible ways to reach the administrators for help or enquiries. It includes an email client option that automatically opens the user’s default mail application with the necessary details filled in. For convenience, the page also offers direct links for Gmail and Outlook users, allowing them to compose messages quickly through their preferred email platforms.
In addition, the Contact Page provides a manual email option, where the official contact address is displayed for users who prefer typing their own messages or using different email services. To further assist users, a copy-and-paste email template is included. This template guides them on what information to include, ensuring clear and complete communication.
 
Figure 8 Contact page

4.2 Description of the Implementation
This section explains how the Lost and Found System was implemented and how it operates, detailing the processes and mechanisms that allow users to record, manage and track lost or found items efficiently.
4.2.1 Hardware Specification
These are the minimum hardware requirements necessary for the Lost and Found System to run efficiently. The computer should have at least 8GB of storage space and 2GB of RAM. The system itself requires approximately 5GB of storage. A quad-core processor is recommended to ensure smooth operation when recording and managing lost or found items. The database will be hosted on the Lost and Found System server and will be accessible 24/7 through a local area network.
4.2.2 Software specification
The Lost and Found System is a web-based application with the frontend built using HTML, CSS and JavaScript, providing a user-friendly interface. The backend is powered by Supa base, which manages the database and handles data storage, retrieval and real-time update.
4.3 Description of testing and results
4.3.1 System Testing
The Lost and Found System was tested using the black-box testing method. This approach evaluates whether the system meets its functional requirements by comparing the specified requirements with the actual system behavior, without examining the internal code structure. It focuses on ensuring that all features work as intended from the user’s perspective.
4.3.2 Testing and Data Results
The table below illustrates how the functional and non-functional requirements of the Lost and Found System were tested:
Module	Test Carried Out	Result of the Test
User Login	Check if system allows valid login	Username and password accepted.
User Login	Check login with invalid credentials	Error message displayed: user not found.
Lost Item Record Input	Enter valid lost/found item data	Data saved successfully.
Dashboard Display	Check if submitted data appears on dashboard	Data displayed correctly.
Table 1:Testing Data and Results
4.3.3 Non-Functional Requirements
The table below shows how the non-functional requirements of the Lost and Found System were tested:
Module	Test Carried Out	Result of Test
Usability	Check if interface is user-friendly	Interface is easy to navigate.
Reliability	Test system behavior under normal use	No crashes or errors occurred.
Performance	Measure response time for actions	Fast and responsive.
Security	Attempt access without login	Access denied.
Maintainability	Make minor code updates	System continued functioning properly.
Table 2 Non-Functional Requirements
4.4.4 Description and Results
The tests conducted on the Lost and Found System evaluated both its functional and non-functional requirements, ensuring that the system operates effectively. The system performed optimally, with fast and responsive processing. Testing was carried out after full system development. Compared to other similar systems, the Lost and Found System proved to be efficient, providing a more streamlined and user-friendly approach than typical organization-based 
websites that track lost and found items.
 
CHAPTER FIVE
CONCLUCTION AND RECOMMENDATION
5.0 Introduction
This chapter presents the conclusions derived from the development and testing of the Lost and Found System, summarizing its effectiveness in addressing the documented inefficiencies of manual tracking methods (Kamau, 2025). It also provides practical recommendations for system usage and identifies key areas for future enhancements to extend the platform's functionality and impact (Mwangi, n.d.).
5.1 Conclusion
The Lost and Found System was developed to address the challenges of manual tracking and management of lost and found items. Through a simple and user-friendly platform, users can now record lost or found items, view records instantly and track them over time. By digitizing this process, the system improves efficiency, organization and accessibility of information for users.
5.2 Recommendation
It is recommended that the Lost and Found System be adopted by organizations, institutions or communities that currently rely on manual methods to track lost and found items. Users should receive training to ensure they can interact with the system effectively. Additionally, support from relevant authorities or local organizations could raise awareness and encourage wider adoption of the system.
5.3 Future Works
The Lost and Found System offers several possibilities for future enhancements. Potential improvements include automated report generation, SMS or email notifications and mobile app integration. These additions would make the system more flexible, accessible and scalable, catering to a broader range of users.
 
REFERENCES
K. (2018, August 18). Digital Record Management for Community Systems. Retrieved from 
https://communitysolutions.com
Castillo, J. A. (n.d.). Lost and Found Database Design. Retrieved from Study.com: 
https://study.com
Kinuthia, J. N. (2012). A community-based item recovery system: case for urban lost and found services.
Ogendo, R. B. (1971). Urban Lost Property Management Systems. Journal of Community Development, Vol. 1, No. 2, pp. 161-165.
Ogendo, R. (n.d.). Community Item Recovery Programs. Journal of Urban Development, Vol. 1, Vol. 2 (1971), pp. 161-165. Retrieved from 
https://www.jstor.org
Practical Community Training Centre. (n.d.). Retrieved from Learning by Doing: 
https://communitytrainingcentre.com
TARAKWO Community Systems: Users trained in Digital Record-Keeping. (2019, November 13). Retrieved from 
https://training.community.org
The Untold Struggles of Lost Item Recovery: The Importance of Digital Tracking. (n.d.). Retrieved from 
https://communityhelp.farm
Webb, B. H. (2025, May 6). Community Lost and Found Systems. Retrieved from 
https://www.britannica.com
Wikipedia. (2025, May 20). Lost and Found. Retrieved from 
https://en.wikipedia.org
APPENDIX
PROJECT LINK : https://thorneijusa-hub.github.io/reunite-the-community/login.html
GITHUB LINK : https://thorneijusa-hub.github.io/reunite-the-community/


