const mongoose = require('mongoose');


// Tour Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must be specified"],
        unique: true,
        trim: true // TODO: trip: Remove all the white-space at the beginning and the ending of a string value. i.e: /              hello         / output: hello
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"]
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
    ratingsAverage: {
        type: Number,
        default: 0
    },
    ratingsQuantity: {
        type: Number,
        default: 4.5
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a summary"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]

});


const Tour = mongoose.model('Tour', tourSchema);



module.exports = Tour;

