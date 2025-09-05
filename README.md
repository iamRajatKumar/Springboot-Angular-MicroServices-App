
# Quiz Question App (Spring Boot Microservices + Angular)

## Overview
The **Quiz Question App** is a microservices-based project built using **Spring Boot**, **Spring Cloud (Eureka, API Gateway)**, and **Angular**.  
It allows users to manage quizzes and questions, authenticate using JWT, and provides a scalable architecture for modern applications.

---

## Features
- **Microservices Architecture**
  - Quiz Service
  - Question Service
  - Authentication Service (JWT)
- **Service Registry** using Netflix Eureka
- **API Gateway** for routing and load balancing
- **JWT Authentication**
- **MySQL Database Integration**
- **Angular Frontend** for UI
- REST APIs for quiz and question management

---

## Tech Stack
### Backend
- Java 17+ / 21+
- Spring Boot
- Spring Cloud (Eureka, Gateway)
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL

### Frontend
- Angular 15+

---

## Microservices
1. **Quiz Service**
   - Manages quizzes (create, update, list)
   - Exposes REST APIs
   - Uses MySQL database

2. **Question Service**
   - Manages questions for quizzes
   - CRUD operations for questions

3. **Authentication Service**
   - Handles user login & signup
   - Generates and validates JWT tokens

4. **API Gateway**
   - Routes requests to respective microservices
   - Configured with CORS and JWT validation

5. **Service Registry (Eureka Server)**
   - Registers and monitors all services

---

## Installation & Setup

### Prerequisites
- Java 17+ or 21+
- Node.js & Angular CLI
- MySQL database
- Maven

### Steps to Run Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-question-app.git
   cd quiz-question-app
   ```

2. Configure database in `application.properties` for each service:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/quiz_questions_app
   spring.datasource.username=root
   spring.datasource.password=root
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Start the services in order:
   - **Eureka Server**
   - **API Gateway**
   - **Authentication Service**
   - **Quiz Service**
   - **Question Service**

4. Verify services are registered at:
   ```
   http://localhost:8761/
   ```

### Steps to Run Frontend
1. Navigate to Angular app folder:
   ```bash
   cd frontend
   npm install
   ng serve
   ```
2. Open in browser:
   ```
   http://localhost:4200/
   ```

---

## API Endpoints

### Authentication Service
- `POST /auth/signup` – Register a user
- `POST /auth/login` – Login and get JWT

### Quiz Service
- `GET /quiz/all` – Get all quizzes
- `POST /quiz/create` – Create a quiz

### Question Service
- `GET /question/all` – Get all questions
- `POST /question/create` – Add a question

---

## Folder Structure
```
quiz-question-app/
│── api-gateway/
│── service-registry/
│── auth-service/
│── quiz-service/
│── question-service/
│── frontend-angular/
└── README.md
```

---

## Future Enhancements
- Dockerize all services
- Add CI/CD with GitHub Actions
- Add role-based authorization
- Generate PDF & Excel quiz reports

---

## License
This project is licensed under the MIT License.

---
**Author**: Rajat Kumar  
**GitHub**: [iamRajatKumar](https://github.com/iamRajatKumar)
