const express = require('express');
const router = express.Router();
const { recordTransaction, getTransaction, getTransactionDetail } = require('../controllers/transactionControl.js');

router.post('/add-transactions', recordTransaction);
router.get('/transactions', getTransaction);
router.get('/transactions/detail/:id', getTransactionDetail);

module.exports = router;