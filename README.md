# CrimeNexus

CrimeNexus is a web-based Crime Reporting and Case Management platform that allows citizens to report crimes digitally and enables law enforcement agencies to manage, track, and analyze cases through a centralized system.

The platform simplifies the traditional crime reporting process by providing a digital interface for submitting reports, monitoring case progress, and analyzing crime trends using interactive dashboards.

---

## Problem Statement

In many regions, crime reporting still relies on manual processes or physical visits to police stations. This leads to:

• Delayed reporting of incidents  
• Difficulty in tracking case progress  
• Inefficient case management  
• Limited crime data insights  

CrimeNexus solves these issues by providing a centralized digital platform for crime reporting and case management.

---

## Key Features

### Crime Reporting
Citizens can submit detailed crime reports including title, description, and location.

### Case Management
Law enforcement authorities can create and manage case records related to reported crimes.

### Dashboard Monitoring
The dashboard provides real-time statistics about crime reports and case records.

### Data Analytics
Interactive charts display crime trends and case distribution.

### Authentication System
Secure login and registration system for users.

### Modern Dashboard UI
A responsive and modern interface designed for usability and clarity.

---

## System Architecture

CrimeNexus follows a **three-tier architecture**:

User Layer  
Citizens and administrators interact with the platform through the web interface.

Frontend Layer  
React-based user interface handles user interactions, dashboards, and forms.

Backend Layer  
Spring Boot REST APIs manage crime data, case records, and business logic.

Data Layer  
The database stores crime reports, case records, and user data.

Architecture Flow:

User  
↓  
React Frontend  
↓  
REST API (Spring Boot Backend)  
↓  
Database  

---

## Technology Stack

### Frontend
React.js  
JavaScript  
HTML5  
CSS3  
Recharts (Data Visualization)  
React Router

### Backend
Java  
Spring Boot  
REST APIs  
Maven

### Tools
Git  
GitHub  
VS Code  

---

## Project Structure

crime-nexus  
│  
├── crime_frontend  
│   ├── public  
│   │   └── index.html  
│   │  
│   ├── src  
│   │   ├── components  
│   │   │   ├── Layout.jsx  
│   │   │   ├── Sidebar.jsx  
│   │   │   └── StatusBadge.jsx  
│   │   │  
│   │   ├── pages  
│   │   │   ├── Dashboard.jsx  
│   │   │   ├── CrimesPage.jsx  
│   │   │   ├── CasesPage.jsx  
│   │   │   ├── AnalyticsPage.jsx  
│   │   │   └── AuthPage.jsx  
│   │   │  
│   │   ├── context  
│   │   │   └── AuthContext.jsx  
│   │   │  
│   │   └── services  
│   │       └── api.js  
│   │  
│   └── package.json  
│  
├── crime_backend  
│   ├── src/main/java  
│   │   ├── controller  
│   │   ├── service  
│   │   ├── model  
│   │   └── repository  
│   │  
│   ├── src/main/resources  
│   │   └── application.properties  
│   │  
│   └── pom.xml  
│  
└── README.md  

---

## Application Workflow

1. User logs in or registers in the system.

2. Citizens submit crime reports through the crime reporting page.

3. The backend processes the report and stores it in the database.

4. Case records are created for investigations.

5. The dashboard displays statistics and analytics about reported crimes.

---

## Dashboard Features

• Total crime reports  
• Open incidents  
• Resolved cases  
• Active investigations  
• Monthly crime reports chart  
• Crime status distribution chart  

These visual insights help authorities monitor crime trends.

---

## How to Run the Project

### Clone Repository

git clone https://github.com/Madhulathayallamanda/crime-nexus.git

cd crime-nexus

---

## Run Frontend

cd crime_frontend

npm install

npm start

Frontend runs at:

http://localhost:3000

---

## Run Backend

cd crime_backend

mvn clean install

mvn spring-boot:run

Backend runs at:

http://localhost:9060

---

## Future Improvements

• AI-based crime prediction analytics  
• Real-time notifications  
• GPS-based nearest police station detection  
• Mobile application integration  
• Role-based access control  

---

## Author

Yallamanda Madhulatha  
Computer Science Engineering Student  
Anurag University  

GitHub  
https://github.com/Madhulathayallamanda
