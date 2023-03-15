const Tour = require('./../models/tourModel');

// TODO: handle error response
const handleError = (res, error) => {
    res.status(500).json({
        status: 'fail',
        message: error.message
    });
}


//====> 03) All functions
exports.getAllTours = async (req, res) => {
    try {
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        console.log(req.query, queryObj);

        // TODO: 1ST WAY
        const tours = await Tour.find(req.query);

        // TODO: 2ND WAY
        // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')

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
