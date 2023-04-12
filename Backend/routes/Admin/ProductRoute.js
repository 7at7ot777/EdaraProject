const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/ImageMiddlware')
const productController = require('../../controllers/ProductController')

router.post('/addNewProduct/:WarehouseId',upload.single('image'),productController.addNewProduct);
router.get('/getProduct',productController.getProduct)


module.exports = router;
