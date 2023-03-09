const express = require('express');
const morgan = require('morgan');

// ROUTES
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const reviewsRouter = require('./routes/reviewRoutes');


const app = express();
const port = 5000;

// 1): MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);


app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`);
});
