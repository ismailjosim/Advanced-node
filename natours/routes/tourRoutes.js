const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

//==> If we want to create some special routes of specific conditions
router.route('/top-5-best').get(tourController.aliasTopTour, tourController.getAllTours)
router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)



//==> All routes
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
