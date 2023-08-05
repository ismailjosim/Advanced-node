const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


// Tour Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must be specified"],
        unique: true,
        trim: true,
        maxlength: [40, 'Tour Name Length Maximum Limit to 40 characters'],
        minlength: [10, 'Tour Name Length Minimum Limit to 10 characters'],
        validate: [validator.isAlpha, "Tour name must only contain characters"] // custom validator package.
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
        required: [true, "A tour must have a difficulty"],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty either easy or medium difficult'
        }
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
    ratingsAverage: {
        type: Number,
        default: 0,
        min: [1, 'Rating Must be above 0'],
        max: [5, 'Rating Must be below 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 4.5
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (value) {
                // custom validation function in mongoose
                // this only points to the current doc on NEW documents creation.
                return value < this.price;
            },
            message: "Discount must be below this actual price"
        }
    },
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
// IMPORTANT: This will only work to  save() and create() documents but it will not work to update() documents.
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
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    this.start = Date.now();
    next();
})

tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query Took ${ Date.now() - this.start } milliseconds`);
    console.log(docs);
    next();
})

// todo: aggregation middleware
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
    console.log(this.pipeline());
    next();

})

// post aggregation is not that important
// models.aggregate is also not important

const Tour = mongoose.model('Tour', tourSchema);



module.exports = Tour;

