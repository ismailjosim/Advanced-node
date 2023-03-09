const fs = require('fs');


//====> 02) All Required files
const tours = JSON.parse(fs.readFileSync(`${ __dirname }/../dev-data/data/tours-simple.json`));


//====> 03) All functions
exports.getAllTours = (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
                tours: tours
            }
        })
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }

}

exports.createTour = (req, res) => {
    try {
        const newId = tours[tours.length - 1].id + 1;
        const newTour = Object.assign({ id: newId }, req.body);

        tours.push(newTour);
        fs.writeFile(`${ __dirname }/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour
                }
            })
        });
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getTour = (req, res) => {
    try {
        const id = Number(req.params.id);
        const tour = tours.find(el => el.id === id);


        if (!tour) {
            return res.status(404).json({
                status: "fail!",
                message: "Tour not found"
            })

        } else {
            res.status(200).json({
                status: "success",
                data: {
                    tour: tour
                }
            })
        }

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.updateTour = (req, res) => {
    try {
        const id = Number(req.params.id);
        const tour = tours.find(el => el.id === id);

        if (id > tours.length) {
            return res.status(404).json({
                status: "fail!",
                message: "Tour not found"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                tour: "data updated!"
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.deleteTour = (req, res) => {
    try {
        const id = Number(req.params.id);
        if (id > tours.length) {
            return res.status(404).json({
                status: "fail!",
                message: "Tour not found"
            })
        }

        res.status(204).json({
            status: "success",
            data: null
        })

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
