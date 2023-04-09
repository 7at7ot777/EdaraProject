const express = require('express');
const router = express.Router();
const DashboardController = require('../../controllers/DashboardController')



router.get('/DashboardDataForAdmin',DashboardController.DashboardDataForAdmin);

module.exports = router