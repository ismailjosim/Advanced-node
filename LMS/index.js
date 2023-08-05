const express = require('express');
const mongoose = require('mongoose');

// express application initialization
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// application routes




// connection database with mongoose
mongoose.connect('mongodb://localhost/todos',)
    .then(result => {
        console.log('Connected to database');

    }).catch(err => {
        console.log(err);
    });



// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}


app.listen(port, () => {
    console.log(`App listening on ${ port }`);
});
