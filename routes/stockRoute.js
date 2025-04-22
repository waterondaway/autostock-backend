const express = require('express');
const router = express.Router();
const { getStockData, getAvailableStock, removeStock, updateStock, addStock } = require('../controllers/stockControl.js');

router.get('/stock', getStockData); 
router.get('/avalible-stock', getAvailableStock); 
router.post('/remove-stock', removeStock);
router.post('/update-stock', updateStock);
router.post('/add-stock', addStock);

module.exports = router;