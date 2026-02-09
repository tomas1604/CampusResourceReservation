# Milestone 2: Database Schema Design Explanation

## Entities I Designed
The core entities of the system represent users, resources, and reservations.

- Users:  
  The users table stores people who can access the system and make reservations. It allows the system to track who created each reservation and supports future authentication and authorization features.

- Resources:  
  The resources table represents reservable campus items such as study rooms and equipment. It stores descriptive information and availability-related data for each resource.

- Reservations:  
  The reservations table records bookings made by users for specific resources during a defined time period. It connects users and resources and stores reservation details.

## Relationships
Reservations are linked to users through the user_id foreign key, which identifies who made each reservation.  
Reservations are linked to resources through the resource_id foreign key, which identifies what resource is being reserved.

These relationships allow one user to have many reservations and one resource to be reserved many times.

## Assumptions
- Users must exist in the system before making reservations.
- A reservation must have a start time and an end time.
- Reservation conflicts are not prevented at the database level.
- Only active resources can be reserved.
- Double booking rules will be enforced later at the API level.

## One Design Decision I Made
I added a purpose field to the reservations table because it allows the system to store why a resource is being reserved, which makes the reservation data more realistic and useful.
