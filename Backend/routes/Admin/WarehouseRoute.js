const express = require('express');
const router = express.Router();
const WarehouseController = require('../../controllers/WarehouseController')

router.get('/getWarehouses',WarehouseController.getWarehouses)
router.post('/addWarehouse',WarehouseController.addWarehouse)
router.delete('/deleteWarehouse/:id',WarehouseController.deleteWarehouse)
router.get('/getSupervisorNameAndID',WarehouseController.getSupervisorNameAndID);
router.get('/setWarehouseInActive/:id',WarehouseController.setInActive);
router.get('/setWarehouseActive/:id',WarehouseController.setActive);

module.exports = router;