const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/AdminController')
const UserValidatior = require('../../middlewares/AddUserFormValidatorMiddleware')

router.post('/addSupervisor',UserValidatior.UserFormValidation,UserValidatior.ValidateInputs,AdminController.addUser);
router.get('/getAllSupervisors',AdminController.getAllUsers);
router.get('/getSupervisor/:id',AdminController.getUser);
router.delete('/deleteSupervisor/:id',AdminController.deleteSupervisor)
router.post('/updateSupervisor/:id',AdminController.updateUser);
router.get('/setInActive/:id',AdminController.setInActive);
router.get('/setActive/:id',AdminController.setActive);

router.get('/getInActiveSupervisors',AdminController.getInActiveSupervisors)




module.exports = router