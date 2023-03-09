const express = require('express');
const morgan = require('morgan');

// ROUTES
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const reviewsRouter = require('./routes/reviewRoutes');

const app = express();

// 1): MIDDLEWARE
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// to use files from filesystem: use the following middleware
app.use(express.static(`${ __dirname }/public`));

// routes
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

module.exports = app;
