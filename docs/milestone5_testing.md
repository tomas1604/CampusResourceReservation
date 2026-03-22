# Milestone 5 Testing

## 1. Successful Login

Endpoint:
POST /auth/login

Request Body:
{
  "email": "auth@test.com",
  "password": "123456"
}

Response:
{
  "token": "JWT_TOKEN_HERE"
}

Description:
User is able to log in successfully and receives a valid JWT token.


---

## 2. Access Protected Route with Valid Token

Endpoint:
POST /api/reservations

Headers:
Authorization: Bearer JWT_TOKEN_HERE

Request Body:
{
  "user_id": 7,
  "resource_id": 1,
  "start_time": "2026-03-25 10:00:00",
  "end_time": "2026-03-25 11:00:00",
  "purpose": "Study"
}

Response:
{
  "message": "Reservation created",
  "reservation_id": 1
}

Description:
Authenticated user can successfully create a reservation using a valid token.


---

## 3. Access Protected Route Without Token

Endpoint:
POST /api/reservations

Headers:
None

Response:
{
  "error": "Missing authorization header"
}

Description:
Request is denied when no token is provided.


---

## 4. Access Admin Route with Non-Admin User

Endpoint:
POST /api/resources

Headers:
Authorization: Bearer USER_TOKEN

Response:
{
  "error": "Access denied"
}

Description:
User without admin role is not allowed to create resources.


---

## 5. Access Admin Route with Admin User

Endpoint:
POST /api/resources

Headers:
Authorization: Bearer ADMIN_TOKEN

Response:
{
  "message": "Resource created",
  "resource_id": 1
}

Description:
Admin user can successfully create a resource.