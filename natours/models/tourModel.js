const mongoose = require('mongoose');
const slugify = require('slugify');


// Tour Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must be specified"],
        unique: true,
        trim: true
    },
    slug: String,
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
        default: Date.now(),
        select: false // this will hide the createdAt when user get the data.
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    },

},
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

// Virtual Properties: getters
tourSchema.virtual('durationWeeks').get(function () { // here we need to use regular functions because the arrow function doesn't work have the 'this' property.
    return this.duration / 7;
})

// todo: DOCUMENT MIDDLEWARE:
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()

})
// section: Pre Methods
// tourSchema.pre('save', function (next) {
//     console.log('will save document...');
//     next();
// })

// section: post Methods
// tourSchema.post('create', function (next) {
//     console.log(doc);
//     next()
// })

// todo: QUERY MIDDLEWARE:
tourSchema.pre('find', function (next) {
    this.find({ secretTour: { $ne: true } })
    next();
})



const Tour = mongoose.model('Tour', tourSchema);



module.exports = Tour;

