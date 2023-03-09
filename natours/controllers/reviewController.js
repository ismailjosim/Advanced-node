const fs = require('fs');

const reviews = JSON.parse(fs.readFileSync(`${ __dirname }/../dev-data/data/reviews.json`));


exports.getAllReviews = (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            results: reviews.length,
            data: {
                reviews: reviews
            }
        })
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

exports.createReview = (req, res) => {

    try {
        const newId = reviews[reviews.length - 1].id + 1;
        const newReviews = Object.assign({ id: newId }, req.body);

        reviews.push(newReviews);
        fs.writeFile(`${ __dirname }/../dev-data/data/reviews.json`, JSON.stringify(reviews), err => {
            res.status(201).json({
                status: "success",
                data: {
                    review: newReviews
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

exports.getSingleReview = (req, res) => {
    try {

    } catch (error) {

    }

}

exports.updateReview = (req, res) => {
    try {

    } catch (error) {

    }

}

exports.deleteReview = (req, res) => {
    try {

    } catch (error) {

    }

}
