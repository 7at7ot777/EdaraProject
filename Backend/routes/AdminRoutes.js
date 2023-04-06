const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')

router.post('/addUser',AdminController.addUser);
router.get('/getAllUsers',AdminController.getAllUsers);
router.get('/deleteUser/:id',AdminController.deleteUser);
router.get('/getUser/:id',AdminController.getUser);
router.post('/updateUser/:id',AdminController.updateUser);



module.exports = router