const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getGoals, updateGoals } = require('../controllers/userController');

const router = express.Router();

router.get('/goals', authMiddleware, getGoals);
router.post('/goals', authMiddleware, updateGoals);

module.exports = router;
