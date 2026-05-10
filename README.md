Project Overview:
This project is a RESTful backend API for a Campus Resource Reservation System. The system allows users to register, authenticate, and reserve campus resources such as rooms or equipment. The API follows REST principles and implements authentication, validation, logging, and centralized error handling to simulate a real-world backend application.
The goal of the project is to demonstrate backend development skills using Node.js, Express, and MySQL while following best practices for structure, security, and maintainability.

Technology Stack:
Node.js
Express.js
MySQL
mysql2
JWT Authentication
GitHub for version control

Setup Instructions:
Clone the repository
Install dependencies:
    npm install
Create a .env file in the root folder.

Environment Variables:
Create a .env file and add:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=campus_reservations
JWT_SECRET=supersecretkey
PORT=3000

Database Initialization Steps:
Create a MySQL database named:
    campus_reservations
Run the SQL schema provided in the repository to create tables:
    users
    resources
    reservations
After this, the API will connect automatically on startup.

Authentication Overview:
The API uses JWT authentication.
Flow:
    User registers using /api/auth/register
    User logs in using /api/auth/login
    Server returns a JWT token
    Token must be included in protected requests:
        Authorization: Bearer <token>
Protected routes include users, resources, and reservations endpoints.

API Endpoint Summary:
Auth Routes:
    POST /api/auth/register → Register new user
    POST /api/auth/login → Login and receive token
Users Routes:
    GET /api/users → Get users (protected)
Resources Routes:
    GET /api/resources → Get resources (protected)
Reservations Routes:
    GET /api/reservations → Get reservations (protected)
    POST /api/reservations → Create reservation (protected)
All responses are returned in JSON format.

How to Run the Project Locally:
Start the server:
npm start
Server runs on:
http://localhost:3000

The application has been tested end-to-end to confirm:
    Database connection works
    Authentication protects routes
    Middleware executes in correct order
    Errors return consistent JSON responses


Refinement and Optimization:
In Milestone 7, the backend system was improved for better structure, readability, and maintainability without changing functionality.
1. Code Refactoring
Repeated validation logic was reduced by introducing a reusable helper function (requireFields), simplifying route handlers and improving consistency.
2. Database Query Improvements
Queries were updated to avoid SELECT * and instead return only required fields (e.g., user_id, full_name, email, role), improving clarity and reducing unnecessary data exposure.
3. Middleware Review
Middleware order was verified to ensure proper flow: logging runs first, authentication protects routes, validation runs before database operations, and error handling runs last.
4. Performance Awareness
Database efficiency was improved by selecting only necessary fields, reducing data transfer and improving response efficiency.