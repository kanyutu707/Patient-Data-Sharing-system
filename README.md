```markdown
# Patient Data Sharing System

Bridging patient data across facilities, securely and instantly.

The Patient Data Sharing System is a comprehensive Health Information Exchange (HIE) platform that enables seamless, patient-controlled sharing of medical records across healthcare facilities. Built with privacy-first principles and emergency-readiness, it ensures the right data reaches the right hands at exactly the right time.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Modules](#modules)
- [How It Works](#how-it-works)
- [Emergency Face-Scan Protocol](#emergency-face-scan-protocol)
- [Data Privacy and Security](#data-privacy-and-security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

---

## Overview

The Patient Data Sharing System is a multi-platform configuration designed to ensure that critical patient medical data, including allergies, chronic conditions, current medications, and medical history, is always accessible at the point of care, even during emergencies.

Patients have full control over who accesses their data. Facilities must request access, and patients authorise it via a secure one-time code. In emergencies, a registered user can use their own app to scan the face of another incapacitated user. Powered by a custom-trained TensorFlow model served via FastAPI, this peer-to-peer scan instantly identifies the patient, routes their critical health data directly to the nearest facility, and triggers an alert to medical personnel. This entire process is completed within seconds, ensuring no patient is ever treated without the information needed to save their life.

---

## Key Features

* **Patient-Chosen Primary Facility** - Patients register and associate with a healthcare facility of their choice.
* **Cross-Facility Data Sharing** - Facilities can request access to a patient's records; the patient authorises sharing with a secure one-time code.
* **Peer-to-Peer Emergency Scan** - Registered users can use their app to scan an incapacitated member's face. The system identifies them using a custom TensorFlow model and routes their data directly to the nearest hospital.
* **Automated Emergency Alerts** - Alert notifications are dispatched to the nearest facility upon emergency scan activation.
* **Patient-Controlled Privacy** - No data is shared without explicit patient authorisation, except under the controlled emergency protocol. The scanning user never sees the patient's medical data on their device.
* **Critical Data on Arrival** - Allergies, current medications, blood type, and diagnoses are available to a receiving facility before the patient arrives.

---

## System Architecture


```

+-----------------------------------------------------------------+
|                  Patient Data Sharing System                    |
|                                                                 |
|  +--------------+    +--------------+    +------------------+  |
|  |   Angular    |    |   Angular    |    |     Angular      |  |
|  |  Medical     |    |  Hospital    |    |   Super Admin    |  |
|  |  Officer UI  |    |  Admin UI    |    |      UI          |  |
|  +------+-------+    +------+-------+    +--------+---------+  |
|         |                  |                      |            |
|         +-----------+------+----------+-----------+            |
|                     |                 |                        |
|            +--------v--------+   +----v-----------+           |
|            |  Spring Boot    |   |  FastAPI        |           |
|            |  REST API       |   |  Face Recognition|          |
|            |  (Java 17)      |   |  Service        |           |
|            +--------+--------+   +----+------------+           |
|                     |                 |                        |
|            +--------v--------+   +----v-----------+           |
|            |   MySQL DB      |   |  TensorFlow    |           |
|            +-----------------+   |  Custom Model  |           |
|                                  +----------------+           |
|                     |                                          |
|            +--------v--------+                                 |
|            |  Flutter Mobile |                                 |
|            |  App (Patient)  |                                 |
|            +-----------------+                                 |
+-----------------------------------------------------------------+

```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend API** | Java 17, Spring Boot |
| **Face Recognition Service** | Python, FastAPI, TensorFlow |
| **Database** | MySQL |
| **Admin and Medical Officer Frontend** | Angular 16 |
| **Patient Mobile App** | Flutter |
| **Authentication** | JWT (JSON Web Tokens) |
| **Real-time Alerts** | WebSockets / Push Notifications |

---

## Modules

### 1. Medical Officer Portal (Angular)

The interface used by doctors and medical officers at registered facilities to:
* View authorised patient records
* Request access to patient data from other facilities
* View emergency-shared records
* Document diagnoses, prescriptions, and clinical notes

### 2. Hospital Admin Portal (Angular)

Used by facility administrators to:
* Manage the facility profile and registered medical officers
* Initiate data access requests to other facilities on behalf of medical officers
* Monitor incoming and outgoing data sharing requests
* Manage patient registrations under the facility

### 3. Super Admin Portal (Angular)

System-wide control for the platform administrator:
* Onboard and manage all registered healthcare facilities
* Monitor system-wide data exchange activity and audit logs
* Manage users across all facilities
* Handle system configuration and compliance oversight

### 4. Patient Mobile App (Flutter)

The patient-facing application for full control over personal health data:
* Register and choose a primary healthcare facility
* View and manage personal medical records
* Receive and authorise data access requests from facilities via a secure one-time code
* Emergency face scan (a user can scan another registered, incapacitated patient)
* Manage sharing history and revoke access at any time

### 5. Face Recognition Service (FastAPI + TensorFlow)

A dedicated microservice responsible for all facial recognition operations:
* Serves a custom-trained TensorFlow model for patient identification
* Connects seamlessly to the wider system architecture using FastAPI
* Accepts face scan inputs from the Flutter mobile app
* Returns a matched patient identity and confidence score to the Spring Boot backend
* Operates independently, allowing the model to be retrained and redeployed without affecting the core API

---

## How It Works

### Standard Data Sharing Flow

1. The patient registers on the mobile app and selects a primary facility.
2. If another facility needs the patient's data, it raises a Data Access Request via the Hospital Admin or Medical Officer portal.
3. The patient receives a notification on their mobile app with the request details, including the requesting facility, the stated reason, and the data being requested.
4. The patient reviews the request and, if they approve, is issued a one-time authorisation code.
5. The patient shares the code with the requesting facility.
6. The facility inputs the code in the portal to unlock access to the authorised records.
7. Access is time-limited and every action is logged for full auditability.

### Emergency Data Sharing Flow

1. A registered user encounters a patient in an emergency and opens the mobile app to activate Emergency Scan mode.
2. They scan the patient's face using their device camera.
3. The image is sent to the FastAPI face recognition service, where the custom-trained TensorFlow model identifies the patient against the database of opted-in profiles.
4. On a confirmed match, the Spring Boot backend immediately routes the patient's critical health data (allergies, blood type, chronic conditions, and current medications) directly to the nearest registered healthcare facility.
5. The scanning user's device acts strictly as the trigger; no medical data or personal records are displayed on their screen.
6. An emergency alert is simultaneously dispatched to the facility, notifying them of the incoming patient and providing the critical medical data ahead of arrival.
7. The entire flow is logged, timestamped, and attributed to the scanning device for accountability.

---

## Emergency Face-Scan Protocol

The emergency face-scan feature is designed with both speed and privacy in mind.

* **Opt-In by Patients** - Patients must explicitly enable emergency scan access when setting up their profile. The feature is disabled by default.
* **Custom TensorFlow Model and FastAPI** - The facial recognition model was trained specifically for this system. It is served as an independent microservice using FastAPI, keeping the recognition logic decoupled from the core application and allowing independent retraining and updates.
* **Zero-Exposure Interface** - The system is designed so that the scanning user never views the victim's health history. The mobile app securely transfers the data backend-to-hospital, preserving absolute patient privacy at the scene.
* **Minimal Data Disclosure** - Only critical, potentially life-saving information is shared with the hospital in emergency mode. Full medical records are never exposed through this channel.
* **Geo-Proximity Routing** - The system uses the scanning device's GPS location to identify and alert the nearest registered facility.
* **Audit Trail** - Every emergency scan generates a timestamped, device-attributed log entry for transparency and regulatory compliance.
* **Revocable** - Patients can disable emergency scan access at any time from within the mobile app.

---

## Data Privacy and Security

The Patient Data Sharing System is built with a privacy-by-design approach:

* All data at rest is encrypted in the MySQL database.
* All data in transit is secured over HTTPS/TLS across all services, including communication between the Spring Boot API and the FastAPI face recognition service.
* Patient records are never shared without explicit authorisation via one-time code, or activation of the emergency protocol.
* One-time authorisation codes are time-limited and single-use.
* All data access events are logged with timestamps, facility identifiers, and user details.
* Role-based access control (RBAC) ensures each user type only accesses data relevant to their role.
* Emergency access is strictly scoped to critical health fields only; full records are inaccessible through the emergency channel, and the data is routed directly to the hospital rather than the scanning user.
* Biometric face embeddings used for recognition are stored separately from medical records and are encrypted at rest.

---

## Getting Started

### Prerequisites

Ensure the following are installed before setting up the project:

* Java 17 or higher
* Maven 3.8 or higher
* MySQL 8.0 or higher
* Node.js 18 or higher and Angular CLI 16
* Flutter SDK 3.x
* Python 3.10 or higher

### Backend Setup

Clone the repository from `kanyutu707/Patient-Data-Sharing-system`, configure the database connection in the application properties file, then build and run the Spring Boot application. The API will be available on port 8080 by default.

### Face Recognition Service Setup

Navigate to the face recognition service directory, install the Python dependencies from the requirements file, and start the FastAPI server. The service will be available on port 8000 by default and exposes a scan endpoint that the Spring Boot backend calls internally.

### Frontend Setup (Angular)

There are three separate Angular applications: Medical Officer, Hospital Admin, and Super Admin. Each is installed and served independently. By default they run on ports 4200, 4201, and 4202 respectively.

### Mobile App Setup (Flutter)

Navigate to the mobile directory, retrieve the Flutter dependencies, and run the application on a connected device or emulator. For the face recognition feature to function correctly, a physical device is recommended, as emulators may not handle the camera input required by the TensorFlow model accurately.

---

## Environment Variables

Each component of the system requires its own environment configuration. At minimum, the following should be configured before running the system locally:

* Database connection URL, username, and password for the Spring Boot backend
* JWT secret key and token expiration duration
* The internal URL of the FastAPI face recognition service, as consumed by the Spring Boot backend
* The emergency alert proximity radius in kilometres
* The base API URL for each Angular application and the Flutter mobile app

Full configuration details for each component are documented in the respective README files within each subdirectory of the repository.

---

## API Documentation

The FastAPI face recognition service automatically generates interactive Swagger documentation, which is accessible at the `/docs` path on port 8000 once the service is running. 

The endpoints for the core Spring Boot backend can be reviewed within the controller layers of the source code.

---

Built to ensure no patient is ever treated without the information needed to save their life.

```
