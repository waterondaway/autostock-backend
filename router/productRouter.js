import express from "express";
import * as productC from '../controller/productController.js'

const router = express.Router()
router.post('/products/add', productC.AddProduct)
router.get('/products/getAll', productC.GetAllProduct)

export default router