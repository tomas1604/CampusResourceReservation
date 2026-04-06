const express = require('express');
 
const usersRoutes = require('./routes/users');
const resourcesRoutes = require('./routes/resources');
const reservationsRoutes = require('./routes/reservations');
const authRoutes = require('./routes/auth');

const app = express();
 
app.use(express.json());

const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger);
 
app.use('/api/users', usersRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/auth', authRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

 
module.exports = app;