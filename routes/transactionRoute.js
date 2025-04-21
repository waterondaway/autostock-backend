const express = require('express');
const router = express.Router();
const { getTransactionData } = require('../controllers/transactionControl');

router.get('/transactions', getTransactionData);

module.exports = router;