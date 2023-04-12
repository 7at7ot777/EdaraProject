const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/ImageMiddlware')
const productController = require('../../controllers/ProductController')

router.post('/addNewProduct/:WarehouseId',upload.single('image'),productController.addNewProduct);
router.get('/getProduct/:id',productController.getProduct)
router.get('/getAllProducts/:WarehouseId',productController.getAllProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)
router.post('/updateProduct/:id',upload.single('image'),productController.updateProduct)


module.exports = router;
