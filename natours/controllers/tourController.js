const APIFeatures = require('../utils/apiFeatures');
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
        // Execute the query
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
        const tours = await features.query;

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

// mongodb aggregation pipeline: match & group.
exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: {
                    ratingsAverage: {
                        $gte: 4.5
                    }
                }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    // _id: '$ratingsAverage',
                    num: { $sum: 1 }, // TODO: total number of tours.
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    maxPrice: { $max: '$price' },
                    minPrice: { $min: '$price' },
                }
            },
            {
                $sort: { avgPrice: 1 }

            },
            // {
            //     $match: { _id: { $ne: 'EASY' } }
            // }
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                stats: stats
            }
        });
    } catch (error) {
        handleError(res, error);
    }
}

// mongodb aggregation pipeline: Unwind & project.
exports.getMonthlyPlan = async (req, res,) => {
    try {
        const year = parseInt(req.params.year, 10); // 2021

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${ year }-01-01`),
                        $lte: new Date(`${ year }-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    num: { $sum: 1 }, // TODO: total number of tours.
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' },
            },
            {
                $project: { _id: 0 } // TODO: Id won't be shown.
            },
            {
                $sort: { numTourStarts: -1 }
            },
            {
                $limit: 12
            }
        ])

        res.status(200).json({
            status: 'success',
            results: plan.length,
            data: {
                plan: plan
            }
        });
    } catch (error) {
        handleError(res, error);
    }

}
