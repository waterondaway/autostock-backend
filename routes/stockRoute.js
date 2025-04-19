const express = require('express');
const { getStockData, getStockDataById } = require('../controllers/stockControl');
const router = express.Router();

router.get('/stock', getStockData); 
router.get('/stock/:id', getStockDataById);

module.exports = router;