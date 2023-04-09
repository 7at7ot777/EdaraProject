const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/AdminController')

router.post('/addSupervisor',AdminController.addUser);
router.get('/getAllSupervisors',AdminController.getAllUsers);
router.get('/deleteSupervisor/:id',AdminController.deleteUser);
router.get('/getSupervisor/:id',AdminController.getUser);
router.post('/updateSupervisor/:id',AdminController.updateUser);



module.exports = router