const { query } = require('express');
const Tour = require('./../models/tourModel');

// TODO: handle error response
const handleError = (res, error) => {
    res.status(500).json({
        status: 'fail',
        message: error.message
    });
}

// TODO: alias Top Tour
exports.aliasTopTour = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,description,summary,price,difficulty';
    next();

}


//====> 03) All functions
exports.getAllTours = async (req, res) => {
    try {
        console.log(req.query);

        // 1A) filtering
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${ match }`);
        let query = Tour.find(JSON.parse(queryStr));


        // 2) sort the results
        if (req.query.sort) {
            // if we want to sort by the multiple fields
            const sortBy = req.query.sort.split(',').join(' '); // { sort: 'price,ratingsAverage' }
            console.log(sortBy);
            query = query.sort(sortBy);
        } else {
            query = query.sort('createdAt')
        }

        // 3) Field limitations
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }


        // 4) Pagination: page & limit: 1 -10 page = 1, 11 -20 page = 2
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numberTours = await Tour.countDocuments();
            if (skip >= numberTours) {
                throw new Error("This page is not available")
            }
        }

        // Execute the query
        const tours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};


// Create a new Tour: POST request
exports.createTour = async (req, res) => {
    try {
        // Previously done with mongodb request
        // const newTour = new Tour({});
        // newTour.save();

        const newTour = await Tour.create(req.body); //TODO: create a new document
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};

exports.getTour = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await Tour.findById(id); // TODO: Find by id is similar to the findOne in mongodb
        res.status(200).json({
            status: 'success',
            data: {
                tour: tour
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};

exports.updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: {
                message: "data update successfully",
                tour: updatedTour
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};


exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            message: "data deleted successfully",
        });
    } catch (error) {
        handleError(res, error);
    }
};
