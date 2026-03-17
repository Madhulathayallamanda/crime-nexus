# CrimeNexus

CrimeNexus is a smart, web-based Crime Reporting and Case Management platform that enables citizens to report crimes digitally while allowing law enforcement agencies to manage, track, and analyze cases through a centralized system.

The platform enhances traditional reporting by integrating **real-time tracking, GPS-based location handling, and intelligent case assignment**, making the system efficient, scalable, and user-friendly.

---

## Problem Statement

In many regions, crime reporting still relies on manual processes or physical visits to police stations. This leads to:

• Delayed reporting of incidents  
• Lack of transparency in case tracking  
• Inefficient allocation of police resources  
• Limited data-driven decision making  

CrimeNexus solves these challenges using a **digital-first, data-driven approach**.

---

## Key Features

### 🚨 Smart Crime Reporting
Users can report crimes online with:
- Title, description, and location  
- Latitude & longitude (GPS-based)  
- Evidence file support  

---

### 📍 Automatic Station Assignment
- Detects user location using coordinates  
- Assigns nearest police station automatically  
- Calculates distance between user and station  

---

### 👤 User Case Tracking
- Users can track submitted cases  
- View real-time status updates:
  - OPEN  
  - IN_PROGRESS  
  - CLOSED  

---

### 👮 Admin / Officer Panel
- Officers can view assigned cases  
- Update investigation status  
- Manage case lifecycle  

---

### 📊 Dashboard Analytics
- Total crime reports  
- Active investigations  
- Closed cases  
- Monthly trends (charts)  
- Crime status distribution  

---

### 🔐 Authentication System
- User registration & login  
- Secure session handling  

---

### 🎨 Modern UI/UX
- Responsive dashboard  
- Interactive charts (Recharts)  
- Clean and intuitive interface  

---

## System Architecture

CrimeNexus follows a **three-tier architecture**:

### 1. User Layer
Citizens and officers interact through the web interface.

### 2. Frontend Layer
React-based UI handles:
- User interaction  
- Routing  
- Dashboard visualization  

### 3. Backend Layer
Spring Boot APIs handle:
- Business logic  
- Crime processing  
- Station assignment  

### 4. Data Layer
Stores:
- Crime reports  
- Case records  
- User data  

---

### Architecture Flow

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
- React.js  
- JavaScript  
- HTML5  
- CSS3  
- Recharts  
- React Router  

### Backend
- Java  
- Spring Boot  
- REST APIs  
- Maven  

### Database
- H2 (In-memory database)  

### Tools
- Git  
- GitHub  
- VS Code  
- Spring Tool Suite (STS)  

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

### 👤 User Flow
1. User registers or logs in  
2. Submits a crime report  
3. System captures GPS coordinates  
4. Nearest police station is auto-assigned  
5. User tracks case status  

---

### 👮 Admin / Officer Flow
1. Officer logs in  
2. Views assigned cases  
3. Updates case status  
4. Resolves cases  

---

## Core Logic (Highlight)

- GPS-based location detection  
- Distance calculation for nearest station  
- Automatic police station assignment  
- Real-time case status updates  

---

## Dashboard Features

• Total crime reports  
• Open incidents  
• Active investigations  
• Resolved cases  
• Monthly crime analytics  
• Status distribution charts  

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

• AI-based crime prediction  
• Real-time notifications  
• Google Maps integration  
• Role-based authentication (Admin/User)  
• Mobile application  

---

## Author

**Yallamanda Madhulatha**  
Computer Science Engineering Student  
Anurag University  

GitHub:  
https://github.com/Madhulathayallamanda

GitHub  
https://github.com/Madhulathayallamanda
