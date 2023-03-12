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
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail!',
            message: 'Please provide name and price'
        });
    }
    next();
};


//====> 03) All functions
exports.getAllTours = (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            // results: tours.length,
            // data: {
            //     tours: tours
            // }
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.createTour = (req, res) => {
    console.log(req.body);
    try {
        res.status(201).json({
            status: 'success',
            // data: {
            //     tour: newTour
            // }
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getTour = (req, res) => {
    try {
        const id = req.params.id * 1;
        // const tour = tours.find(el => el.id === id);
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         tour: tour
        //     }
        // });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.updateTour = (req, res) => {
    try {
        // const tour = tours.find(el => el.id === id);

        res.status(200).json({
            status: 'success',
            data: {
                tour: 'data updated!'
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};
exports.deleteTour = (req, res) => {
    try {
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};
