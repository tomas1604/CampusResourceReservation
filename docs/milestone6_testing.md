# Milestone 6 Testing

## Request Logging

Endpoint: Any endpoint (example: GET /api/reservations)

Request:
GET /api/reservations

Console Output:
[2026-04-05T22:45:12.345Z] GET /api/reservations

Description:
Every incoming request is logged with the HTTP method, route, and timestamp. This allows developers to track API usage in real time.

## Handled Error: Invalid Route

Endpoint: GET /api/nonexistent

Request:
GET /api/nonexistent

Console Output:
Error: Table 'mydb.nonexistent' doesn't exist

Response:
{
"error": "Table 'mydb.nonexistent' doesn't exist"
}

Description:
Unexpected errors are caught by the centralized error handler. The server continues running, logs the error, and returns a consistent JSON response.

## Validation Error: Missing Fields

Endpoint: POST /api/reservations

Request Body:
{
"user_id": 1,
"resource_id": 2
}

Response:
{
"error": "start_time is required"
}

Description:
Routes validate required fields and return 400 Bad Request with clear, short messages when input is missing or invalid.

## Handled Error: Invalid Login

Endpoint: POST /auth/login

Request Body:
{}

Response:
{
"error": "Invalid credentials"
}

Console Output:
Error: Invalid credentials

Description:
Login with missing or incorrect credentials is safely handled. The server logs the error, but no sensitive data is returned to the client.

## Reliability Behavior

API continues running after invalid requests (e.g., empty POST bodies).

Validation errors return meaningful 400 responses.

Unexpected errors return 500 responses with safe messages.

All requests and errors are logged to the console.

No persistent logging is required.

## Summary

Request logging improves observability.

Centralized error handling ensures consistent responses and prevents crashes.

Validation errors provide clear guidance to clients.

Reliability improvements make the API safer and easier to debug.

Routes updated: users.js, reservations.js, auth.js.