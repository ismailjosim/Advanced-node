const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 5000;

// 1): MIDDLEWARE
app.use(express.json());


// custom middleware
// app.use((req, res, next) => {
//     console.log("Hello, world!");

//     next();

// })






// 02): Data collections
const tours = JSON.parse(fs.readFileSync(`${ __dirname }/dev-data/data/tours-simple.json`));



// 03):ROUTES HANDLERS
const defaultRoute = (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: 'Natours server Connected 🎉🎉'
        });
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

const getAllTours = (req, res) => {
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

const createTour = (req, res) => {
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

const getTour = (req, res) => {
    try {
        const id = Number(req.params.id);
        const tour = tours.find(el => el.id === id);

        // if (id > tours.length) { // check via tour length
        if (!tour) { // check via tour is found or not
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

const updateTour = (req, res) => {
    try {
        const id = Number(req.params.id);
        const tour = tours.find(el => el.id === id);

        if (id > tours.length) { // check via tour is found or not
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

const deleteTour = (req, res) => {
    try {
        const id = Number(req.params.id);
        // const tour = tours.find(el => el.id === id);

        if (id > tours.length) { // check via tour is found or not
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


// 04):ROUTES

// ====> All specified endpoints
/*

app.get('/', defaultRoute);
app.get('/api/v1/tours', getAllTours)
app.get('/api/v1/tours/:id', getTour)
app.post('/api/v1/tours', createTour)
app.patch('/api/v1/tours/:id', updateTour)
app.delete('/api/v1/tours/:id', deleteTour)

*/

// set route: in future we can change this easily
app.route('/').get(defaultRoute);
app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);



// 05): START THE SERVER
app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`);
});



/*
IMPORTANT:
--------->
'/api/v1/tours/:id/:value/:number?'
use this method to use more then 1 parameter ===> '/api/v1/tours/:id/:value/:number'. If we don't need multiple values, use ? them it will only take those values that user input.



*/
