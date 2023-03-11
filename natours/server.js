const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
require('colors')


const app = require('./app');
const dbConnect = require('./config/dbConnect');


const port = process.env.PORT || 5000;

// database connection
dbConnect();

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must be specified"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
});


const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Park Camper',
    price: 1000,
});


// testTour.save().then((doc) => {
//     console.log(doc);
// }).catch(err => console.log(`Error Found 🤷‍♂️: ${ err }`));


app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`.bgCyan.italic.bold);
});
