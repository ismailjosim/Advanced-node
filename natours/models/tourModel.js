const mongoose = require('mongoose');


// Tour Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must be specified"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a maximum group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"]
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
    ratingsQuantity: {
        type: Number,
        default: 4.5
    },
    ratingsAverage: {
        type: Number,
        default: 0
    },
    priceDiscount: Number,
    summery: {
        type: String,
        trim: true,
        required: [true, "A tour must have a summery"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have an image cover"]
    },
    images: [String],

});


const Tour = mongoose.model('Tour', tourSchema);



module.exports = Tour;

/*

                "startLocation": {
                    "type": "Point",
                    "coordinates": [
                        -80.185942,
                        25.774772
                    ],
                    "description": "Miami, USA",
                    "address": "301 Biscayne Blvd, Miami, FL 33132, USA"
                },
                "ratingsAverage": 4.3,
                "ratingsQuantity": 7,
                "images": [
                    "tour-2-1.jpg",
                    "tour-2-2.jpg",
                    "tour-2-3.jpg"
                ],
                "startDates": [
                    "2021-06-19T09:00:00.000Z",
                    "2021-07-20T09:00:00.000Z",
                    "2021-08-18T09:00:00.000Z"
                ],
                "secretTour": false,
                "guides": [
                    {
                        "photo": "user-12.jpg",
                        "role": "lead-guide",
                        "_id": "5c8a22c62f8fb814b56fa18b",
                        "name": "Miyah Myles",
                        "email": "miyah@example.com"
                    },
                    {
                        "photo": "user-6.jpg",
                        "role": "guide",
                        "_id": "5c8a1f4e2f8fb814b56fa185",
                        "name": "Jennifer Hardy",
                        "email": "jennifer@example.com"
                    }
                ],
                "_id": "5c88fa8cf4afda39709c2955",
                "name": "The Sea Explorer",
                "duration": 7,
                "maxGroupSize": 15,
                "difficulty": "medium",
                "price": 497,
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "imageCover": "tour-2-cover.jpg",
                "locations": [
                    {
                        "type": "Point",
                        "coordinates": [
                            -80.128473,
                            25.781842
                        ],
                        "_id": "5c88fa8cf4afda39709c2959",
                        "description": "Lummus Park Beach",
                        "day": 1
                    },
                    {
                        "type": "Point",
                        "coordinates": [
                            -80.647885,
                            24.909047
                        ],
                        "_id": "5c88fa8cf4afda39709c2958",
                        "description": "Islamorada",
                        "day": 2
                    },
                    {
                        "type": "Point",
                        "coordinates": [
                            -81.0784,
                            24.707496
                        ],
                        "_id": "5c88fa8cf4afda39709c2957",
                        "description": "Sombrero Beach",
                        "day": 3
                    },
                    {
                        "type": "Point",
                        "coordinates": [
                            -81.768719,
                            24.552242
                        ],
                        "_id": "5c88fa8cf4afda39709c2956",
                        "description": "West Key",
                        "day": 5
                    }
                ],
                "slug": "the-sea-explorer",
                "durationWeeks": 1,
                "reviews": null,
                "id": "5c88fa8cf4afda39709c2955"











*/
