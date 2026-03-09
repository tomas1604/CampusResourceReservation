# Milestone 4 Testing Notes

## Validation Failure Example

Request:
POST /api/users

Body:
{
  "email": "test@test.com"
}

Result:
Validation middleware rejects the request because the required field `full_name` is missing.

Response:
400 Bad Request


## Handled Server Error Example

A forced error was triggered inside the reservations route using:

throw new Error("Test error")

The error was passed to the global error handler and returned:

Response:
500 Internal Server Error

{
  "error": "An unexpected server error occurred"
}

## Successful Request After Validation (Resource Exists)

Request:
POST /api/reservations

Body:
{
"user_id": 1,
"resource_id": 2,
"start_time": "2026-06-01T10:00:00",
"end_time": "2026-06-01T11:00:00"
}

Result:
The system first checked that the resource with id = 2 exists in the database. Since it exists, the reservation was successfully created.

Response:
201 Created

{
"message": "Reservation created",
"reservation_id": 7
}
