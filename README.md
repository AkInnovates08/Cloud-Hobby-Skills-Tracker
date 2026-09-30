# Online Hobby & Skills Tracker with Community Sharing on Cloud

A full-stack cloud-oriented web application for managing personal hobbies, skills, learning goals, practice sessions, progress analytics, achievements, and community sharing.

The project demonstrates practical Cloud Computing concepts through a modular architecture using React, FastAPI, SQLite, REST APIs, JWT authentication, cloud-ready storage architecture, analytics, and community features.

---

## Project Overview

The Online Hobby & Skills Tracker is designed to help users organize and continuously improve their personal skills and hobbies.

Users can:

* Create an account
* Manage their profile
* Add and manage skills
* Set learning goals
* Track practice sessions
* Monitor progress
* Build practice streaks
* View analytics
* Share achievements
* Create community posts
* Like posts
* Comment on posts
* Manage their own content
* Access their information through a responsive web interface

The application is designed as a student-friendly Cloud Computing project that can run locally without paid cloud services while maintaining an architecture that can later be deployed using managed cloud services.

---

## Problem Statement

People often learn multiple skills and hobbies without having a centralized system to track their progress.

Traditional notes and spreadsheets make it difficult to:

* Track practice consistently
* Measure progress
* Maintain learning goals
* Monitor practice streaks
* Analyze skill development
* Share achievements
* Interact with other learners

This project provides a centralized platform where users can manage their skills, track practice activities, analyze progress, and participate in a community.

---

## Objectives

The main objectives are:

1. Build a complete cloud-oriented web application.
2. Implement secure user authentication.
3. Provide user-specific skill and hobby management.
4. Implement goal and progress tracking.
5. Record practice sessions.
6. Generate progress analytics.
7. Build a community sharing system.
8. Implement likes and comments.
9. Demonstrate REST API architecture.
10. Demonstrate database relationships.
11. Provide local cloud-service simulation.
12. Design the system for future cloud deployment.
13. Implement error handling and validation.
14. Create a responsive and professional user interface.
15. Maintain a GitHub-ready project structure.

---

# Key Features

## Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing
* Protected application routes
* Authentication token handling
* Session persistence

## User Profile

Users can manage:

* Name
* Email
* Bio
* Profile information

## Skill Management

Users can:

* Create skills
* View skills
* Edit skills
* Delete skills
* Select skill categories
* Set skill levels
* Track skill status
* Add descriptions

Example skills:

* Photography
* Coding
* Guitar
* Painting
* Cooking
* Fitness
* Chess
* Writing
* Video Editing
* Graphic Design

## Goal Management

Users can create learning goals for their skills.

Example:

```text
Skill: Photography

Goal: Practice Photography

Target: 20 Hours

Current Progress: 12 Hours

Progress: 60%
```

Goals support:

* Skill selection
* Goal title
* Target value
* Current value
* Unit
* Deadline
* Status

## Practice Tracking

Users can record practice sessions including:

* Skill
* Duration
* Activity
* Notes
* Practice date

Example:

```text
Skill: Photography
Duration: 60 minutes
Activity: Portrait photography
Notes: Practiced natural-light composition
```

Practice data is used for:

* Total practice hours
* Weekly practice
* Monthly practice
* Goal progress
* Practice streaks
* Analytics

## Community

The application includes a community feed where users can:

* Create posts
* Share achievements
* Select related skills
* View community posts
* Like posts
* Unlike posts
* Add comments
* Delete their own posts

The community module demonstrates user-generated content and social interaction.

## Analytics

The analytics dashboard provides information such as:

* Total practice hours
* Weekly practice hours
* Monthly practice hours
* Most practiced skill
* Current practice streak
* Goals completed
* Active goals
* Community posts
* Likes received
* Comments received
* Practice distribution by skill

Charts are implemented using Recharts.

---

# Dashboard

The dashboard provides a centralized overview of the user's activity.

It includes:

* Welcome section
* Active skills
* Total practice hours
* Goals
* Practice streak
* Skill overview
* Recent community activity
* Practice analytics
* Quick actions

Quick actions include:

* Add Skill
* Log Practice
* Create Goal
* Community

The dashboard is designed to provide important information without requiring users to navigate through multiple pages.

---

# Technology Stack

## Frontend

* React
* Vite
* React Router
* JavaScript
* CSS
* Lucide React
* Recharts

## Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* JWT
* Passlib-compatible password hashing approach

## Database

Local development:

* SQLite
* SQLAlchemy ORM

Cloud-ready alternatives:

* PostgreSQL
* Supabase PostgreSQL
* Amazon RDS
* Azure Database for PostgreSQL
* Google Cloud SQL

## Storage

Local development:

```text
backend/uploads/
```

Cloud-ready alternatives:

* Amazon S3
* Azure Blob Storage
* Google Cloud Storage
* Supabase Storage
* Firebase Storage

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Python
* Node.js
* npm

---

# System Architecture

## Local Architecture

```text
                    USER
                     |
                     v
             React Frontend
              Vite Development
                     |
                     v
                REST API
                     |
                     v
               FastAPI Backend
                     |
          +----------+----------+
          |          |          |
          v          v          v
       SQLite     Uploads    Analytics
       Database   Storage    Services
          |
          v
   User / Skills / Goals
   Practice / Community
```

## Cloud Architecture

The application can be extended to:

```text
                    USERS
                      |
                      v
                    CDN
                      |
                      v
              React Frontend
                      |
                      v
                API Gateway
                      |
                      v
             FastAPI / Serverless
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
   Managed Database  Object      Cache
   PostgreSQL        Storage
          |           |
          v           v
       Analytics   User Files
                      |
                      v
              Monitoring/Logging
```

---

# Application Data Flow

```text
User
 |
 v
Register / Login
 |
 v
JWT Authentication
 |
 v
Dashboard
 |
 +----> Create Skill
 |
 +----> Create Goal
 |
 +----> Log Practice
 |
 +----> Calculate Progress
 |
 +----> Generate Analytics
 |
 +----> Create Community Post
 |
 +----> Like / Comment
 |
 v
Database
```

---

# Project Structure

```text
Cloud-Hobby-Skills-Tracker/
│
├── backend/
│   │
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── profile.py
│   │   │   ├── skills.py
│   │   │   ├── goals.py
│   │   │   ├── practice.py
│   │   │   ├── posts.py
│   │   │   └── analytics.py
│   │   │
│   │   ├── services/
│   │   │   ├── analytics.py
│   │   │   └── storage.py
│   │   │
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── deps.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   ├── tests/
│   │   └── test_health.py
│   │
│   ├── uploads/
│   ├── .env.example
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Goals.jsx
│   │   │   ├── Practice.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Community.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── .gitignore
├── START_BACKEND.bat
├── START_FRONTEND.bat
└── EXECUTION_STEPS.txt
```

---

# Database Design

The application uses a relational database through SQLAlchemy.

## Main Entities

```text
USERS
  |
  +---- SKILLS
  |       |
  |       +---- GOALS
  |       |
  |       +---- PRACTICE_SESSIONS
  |
  +---- POSTS
          |
          +---- COMMENTS
          |
          +---- LIKES
```

## Users

Stores:

* User ID
* Name
* Email
* Password hash
* Bio
* Created date

## Skills

Stores:

* Skill ID
* User ID
* Skill name
* Category
* Level
* Status
* Description
* Dates

## Goals

Stores:

* Goal ID
* Skill ID
* Title
* Target value
* Current value
* Unit
* Deadline
* Status

## Practice Sessions

Stores:

* Session ID
* User ID
* Skill ID
* Duration
* Activity
* Notes
* Practice date

## Posts

Stores:

* Post ID
* User ID
* Skill ID
* Content
* Created date

## Comments

Stores:

* Comment ID
* Post ID
* User ID
* Content
* Created date

## Likes

Stores:

* Like ID
* Post ID
* User ID
* Created date

---

# REST API

The backend follows REST API principles.

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Profile

```text
GET /api/profile
PUT /api/profile
```

## Skills

```text
GET    /api/skills
POST   /api/skills
GET    /api/skills/{id}
PUT    /api/skills/{id}
DELETE /api/skills/{id}
```

## Goals

```text
GET    /api/goals
POST   /api/goals
PUT    /api/goals/{id}
DELETE /api/goals/{id}
```

## Practice

```text
GET  /api/practice
POST /api/practice
```

## Community

```text
GET    /api/posts
POST   /api/posts
DELETE /api/posts/{id}
```

## Social Features

```text
POST   /api/posts/{id}/like
DELETE /api/posts/{id}/like
POST   /api/posts/{id}/comments
GET    /api/posts/{id}/comments
```

## Analytics

```text
GET /api/analytics/dashboard
```

---

# Authentication and Authorization

The application uses JWT-based authentication.

Authentication workflow:

```text
User Registration
       |
       v
Password Hashing
       |
       v
Database
       |
       v
Login
       |
       v
JWT Token
       |
       v
Frontend
       |
       v
Protected API Requests
```

Protected endpoints require a valid authentication token.

User-specific resources are associated with the authenticated user.

---

# Security

The project demonstrates several basic application security practices.

## Password Security

Passwords are never stored as plain text.

Instead:

```text
Plain Password
      |
      v
Password Hash
      |
      v
Database
```

## JWT Authentication

Protected endpoints require a valid JWT token.

## Authorization

Users should only be able to modify their own:

* Skills
* Goals
* Practice records
* Profile
* Community posts

## Input Validation

Backend schemas validate incoming API data.

## File Validation

Uploaded files can be checked for:

* Allowed file extensions
* Maximum file size

## Environment Variables

Sensitive configuration is kept outside source code.

Example:

```text
SECRET_KEY
DATABASE_URL
CORS_ORIGINS
UPLOAD_DIR
```

These values should be configured using `.env`.

---

# Error Handling

The application includes frontend and backend error handling.

Frontend protections include:

* Loading states
* Empty states
* API error messages
* Retry actions
* Error boundary
* Network timeout handling
* Protected route handling

The application is designed so that one failed API request should not unnecessarily make unrelated pages unusable.

Example:

```text
Backend unavailable
       |
       v
Frontend detects request failure
       |
       v
Display useful error message
       |
       v
Retry
```

---

# Community Error Resilience

The Community module uses resilient request handling.

Publishing a post follows:

```text
Create Post
    |
    v
Backend API
    |
    v
Database
    |
    v
Post Response
    |
    v
Update Community Feed
```

The application also handles failed feed requests without intentionally crashing the entire React application.

Community posts are associated with their users and optional skills.

---

# Cloud Computing Concepts Demonstrated

## Cloud Computing

The application uses a client-server architecture that can be hosted remotely and accessed through the internet.

## SaaS

The complete application can be provided as a software service to users.

## PaaS

The FastAPI backend and React frontend can be deployed using managed application hosting platforms.

## Cloud Database

SQLite is used for local development, while PostgreSQL and managed cloud databases can be used for deployment.

## Object Storage

Local upload storage represents the storage layer and can be replaced by:

* Amazon S3
* Azure Blob Storage
* Google Cloud Storage
* Supabase Storage

## REST APIs

Frontend and backend communicate through REST APIs.

## Authentication

JWT authentication protects user-specific resources.

## Scalability

The architecture can be extended with:

* Managed databases
* Load balancing
* Horizontal scaling
* Caching
* CDN
* Object storage
* Background workers

## Environment Variables

Application configuration and secrets are separated from source code.

## Monitoring

Production deployment can integrate cloud monitoring and logging services.

---

# Local Development

## Requirements

Install:

* Python 3.10+
* Node.js
* npm
* Git
* Visual Studio Code

Recommended:

```text
Python 3.11 or 3.12
Node.js 18+
npm
```

---

# Backend Setup

Open PowerShell:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Create environment file:

```powershell
Copy-Item .env.example .env
```

Start FastAPI:

```powershell
uvicorn app.main:app --reload --port 8000
```

Backend URL:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

Expected:

```json
{
  "status": "healthy"
}
```

---

# Frontend Setup

Open another PowerShell terminal.

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start Vite:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Quick Start

### Terminal 1

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

### Terminal 2

```powershell
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Recommended Test Flow

After starting both services:

```text
1. Register a new account
2. Login
3. Open Dashboard
4. Add a skill
5. Open Skills
6. Edit the skill
7. Create a goal
8. Log a practice session
9. Check goal progress
10. Open Analytics
11. Open Community
12. Create a post
13. Like the post
14. Add a comment
15. Delete your own post
16. Open Profile
17. Navigate between pages without refreshing
```

---

# Example User Journey

```text
Register
   |
   v
Login
   |
   v
Dashboard
   |
   +------> Add Photography Skill
   |
   v
Create Goal
"Practice Photography for 20 Hours"
   |
   v
Log Practice
"60 Minutes"
   |
   v
Progress Updated
   |
   v
Analytics
   |
   v
Create Achievement Post
   |
   v
Community Feed
   |
   +------> Like
   |
   +------> Comment
```

---

# Testing

Backend tests are included in:

```text
backend/tests/
```

Run:

```powershell
cd backend
pytest
```

Basic test coverage includes:

* Health endpoint
* User registration
* Authentication-related backend behavior

Additional manual testing should cover:

* Duplicate registration
* Invalid login
* Profile updates
* Skill creation
* Skill update
* Skill deletion
* Goal creation
* Practice logging
* Analytics
* Community posts
* Likes
* Comments
* Unauthorized operations
* API failure handling
* Navigation without refresh

---

# Failure Handling

The application considers several common failure scenarios.

## Backend Unavailable

The frontend displays a backend connection message instead of silently failing.

## API Request Timeout

API requests use timeout handling so the interface does not remain indefinitely waiting for a response.

## Authentication Expiration

Protected API requests can detect authentication failures and require the user to authenticate again.

## Invalid Data

Backend validation rejects invalid API input.

## Community Feed Failure

Community feed failures are displayed through an error state with retry functionality.

## React Component Failure

An Error Boundary prevents a single React component error from producing an unrecoverable blank application.

---

# Cloud Deployment Roadmap

The local version is intentionally designed so that individual components can later be replaced with managed cloud services.

## Frontend

Possible services:

* Vercel
* Netlify
* AWS S3 + CloudFront
* Azure Static Web Apps

## Backend

Possible services:

* Render
* Railway
* AWS App Runner
* AWS Lambda
* Azure App Service
* Google Cloud Run

## Database

Possible services:

* Supabase PostgreSQL
* Amazon RDS
* Azure Database for PostgreSQL
* Google Cloud SQL

## Object Storage

Possible services:

* Amazon S3
* Azure Blob Storage
* Google Cloud Storage
* Supabase Storage

---

# Example Production Architecture

```text
                         USERS
                           |
                           v
                         CDN
                           |
                           v
                  React Web Application
                           |
                           v
                     API Gateway
                           |
                           v
                    FastAPI Backend
                           |
            +--------------+--------------+
            |              |              |
            v              v              v
      PostgreSQL       Object Storage    Cache
            |              |
            v              v
       Application       User Files
          Data
            |
            v
        Analytics
            |
            v
    Monitoring / Logging
```

---

# Scalability

For a small number of users:

```text
React
  |
FastAPI
  |
SQLite
```

For a larger application:

```text
React
  |
CDN
  |
Load Balancer
  |
Multiple Backend Instances
  |
Managed PostgreSQL
  |
Object Storage
  |
Cache
```

Scalability improvements can include:

* Horizontal backend scaling
* Database indexing
* Pagination
* Caching
* CDN
* Object storage
* Background jobs
* Queue-based processing
* Managed database services
* Monitoring
* Rate limiting

---

# Future Enhancements

Potential improvements include:

* Cloud authentication
* Supabase integration
* PostgreSQL production database
* Cloud object storage
* Profile image upload
* Achievement image upload
* Milestone management
* Follow system
* Notifications
* Search and filtering
* Community moderation
* User reporting
* Content moderation
* Password reset
* Email verification
* Two-factor authentication
* Advanced analytics
* Mobile application
* PWA support
* AI-based skill recommendations
* Personalized learning plans
* Recommendation engine
* Production monitoring
* CI/CD pipeline

---

# GitHub Setup

Initialize the repository:

```powershell
git init
```

Add files:

```powershell
git add .
```

Create the first commit:

```powershell
git commit -m "Initialize cloud hobby and skills tracker"
```

Rename branch:

```powershell
git branch -M main
```

Add GitHub remote:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/Cloud-Hobby-Skills-Tracker.git
```

Push:

```powershell
git push -u origin main
```

---



---



# Project Highlights

This project demonstrates:

* Full-stack development
* Cloud computing architecture
* REST API development
* JWT authentication
* Database design
* SQLAlchemy ORM
* CRUD operations
* User authorization
* Practice tracking
* Goal tracking
* Progress analytics
* Community functionality
* Likes and comments
* Error handling
* Responsive UI
* Local cloud simulation
* Cloud deployment architecture
* GitHub project organization

---

# Learning Outcomes

Through this project, the following concepts can be demonstrated:

## Software Development

* Frontend development
* Backend development
* REST APIs
* Database integration
* Authentication
* Authorization
* Error handling

## Cloud Computing

* Client-server architecture
* Cloud-hosted applications
* Managed databases
* Object storage
* Scalability
* Availability
* CDN concepts
* API gateway concepts
* Environment configuration
* Monitoring
* Cloud deployment

## Database

* Relational database design
* Primary keys
* Foreign keys
* Relationships
* ORM
* CRUD operations
* Query design

## Security

* Password hashing
* JWT authentication
* Authorization
* Input validation
* Environment variables
* Secure file handling

---

# Project Status

```text
Frontend              Completed
Backend               Completed
Authentication        Completed
Profile Management    Completed
Skill Management      Completed
Goal Management       Completed
Practice Tracking     Completed
Analytics             Completed
Community             Completed
Likes                 Completed
Comments              Completed
Error Handling        Implemented
Responsive UI         Implemented
Local Database        Implemented
Cloud Architecture    Ready for Extension
Testing               Included
Documentation         Included
```

---

# Local vs Cloud

The current project intentionally supports local development so that students can build and demonstrate the complete application without requiring paid cloud infrastructure.

| Component      | Local Implementation | Cloud Upgrade                        |
| -------------- | -------------------- | ------------------------------------ |
| Frontend       | Vite + React         | Vercel / Netlify / AWS               |
| Backend        | FastAPI              | Cloud Run / App Runner / App Service |
| Database       | SQLite               | PostgreSQL                           |
| Storage        | Local uploads        | S3 / Blob / Cloud Storage            |
| Authentication | JWT                  | Managed Authentication               |
| Analytics      | FastAPI services     | Cloud analytics services             |
| Monitoring     | Application logs     | Cloud monitoring                     |
| CDN            | Local development    | Cloud CDN                            |

---

# Why This Project Is Cloud-Oriented

Although the development version can run completely on a local computer, its architecture separates:

```text
Frontend
Backend
Database
Storage
Authentication
Analytics
```

This separation allows the local components to be replaced with managed cloud services without redesigning the entire application.

For example:

```text
SQLite
   |
   v
PostgreSQL

Local Uploads
   |
   v
Amazon S3 / Cloud Storage

Local FastAPI
   |
   v
Cloud Run / App Service / App Runner

Local Frontend
   |
   v
CDN + Static Hosting
```

This makes the project suitable for demonstrating both application development and Cloud Computing concepts.

---


# License

This project is created for educational, academic, portfolio, and learning purposes.

You may modify and extend the project for personal learning and development.

---

# Acknowledgement

Special thanks to mentors, faculty members, and everyone who provided guidance and support during the development of this project.

---

# Conclusion

The Online Hobby & Skills Tracker with Community Sharing on Cloud is a complete full-stack application that combines personal skill management, practice tracking, goal management, analytics, and community interaction.

The project demonstrates how a locally executable application can be designed with cloud-ready architecture and gradually migrated toward managed cloud infrastructure.

It provides practical experience in:

```text
React
+
FastAPI
+
REST APIs
+
JWT Authentication
+
SQLAlchemy
+
Database Design
+
Analytics
+
Community Features
+
Cloud Architecture
+
Security
+
Scalability
```

The architecture provides a strong foundation for further development into a production-ready cloud platform.
