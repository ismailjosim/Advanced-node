const express = require('express');
const fs = require('fs');


const app = express();
const port = 5000;

// Middleware
app.use(express.json());


//==> Default end point
// app.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'Natours server Connected 🎉🎉'
//     });
// });


// app.post('/', (req, res) => {
//     res.send("You can post to this input");
// })


//===> Get All tours
const tours = JSON.parse(fs.readFileSync(`${ __dirname }/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
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
})

//===> Post new tour
app.post('/api/v1/tours', (req, res) => {
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
})

// Get tour using tour ID
// use this method to use more then 1 parameter ===> '/api/v1/tours/:id/:value/:number'
// If we don't need multiple values, use ? them it will only take those values that user input.

//====> '/api/v1/tours/:id/:value/:number?'

app.get('/api/v1/tours/:id', (req, res) => {
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
})

// Patch Request to update tour data
app.patch('/api/v1/tours/:id', (req, res) => {
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
})

//====> Delete Tour
app.delete('/api/v1/tours/:id', (req, res) => {
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
})




app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`);
});
