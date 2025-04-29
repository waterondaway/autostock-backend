const express = require('express');
const router = express.Router();
const { getProfile, editProfile } = require('../controllers/profileControl');

router.get('/profile/:id', getProfile);
router.post('/profile-update', editProfile)

module.exports = router;