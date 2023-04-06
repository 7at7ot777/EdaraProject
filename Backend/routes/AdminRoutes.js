const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')

router.post('/addUser',AdminController.addUser);
router.get('/getAllUsers',AdminController.getAllUsers);

module.exports = router