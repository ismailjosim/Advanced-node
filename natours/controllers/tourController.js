const Tour = require('./../models/tourModel');

//====> 02) All Required files
// const tours = JSON.parse(
//     fs.readFileSync(`${ __dirname }/../dev-data/data/tours-simple.json`)
// );






//==> Check if ID is valid or not
// exports.checkID = (req, res, next, val) => {
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail!',
//             message: 'Invalid ID'
//         });
//     }
//     next();
// };

//==> Check the body contents name and price properties
// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail!',
//             message: 'Please provide name and price'
//         });
//     }
//     next();
// };


//====> 03) All functions
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find(); // TODO: Get all tours use find in mongoose.
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
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
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
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
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
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
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
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
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};
