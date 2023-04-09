const express = require('express');
const router = express.Router();
const WarehouseController = require('../../controllers/WarehouseController')

/* CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD */ 
router.get('/getWarehouses',WarehouseController.getWarehouses)
router.post('/addWarehouse',WarehouseController.addWarehouse)
router.delete('/deleteWarehouse/:id',WarehouseController.deleteWarehouse)
router.put('/updateWarehouse',WarehouseController.updateWarehouse);



router.get('/getwarehouseNameAndID',WarehouseController.getwarehouseNameAndID);
router.get('/setWarehouseInActive/:id',WarehouseController.setInActive);
router.get('/setWarehouseActive/:id',WarehouseController.setActive);

module.exports = router;