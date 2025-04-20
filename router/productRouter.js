import express from "express";
import * as productC from '../controller/productController.js'

const router = express.Router()
router.post('/products/add', productC.AddProduct)

export default router