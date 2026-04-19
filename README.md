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
