const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  addFood,
  detectFood,
  getDailyFood,
  getWeeklyFood,
  getMonthlyFood,
  deleteFood,
  updateFood,
} = require('../controllers/foodController');

const router = express.Router();

router.post('/', authMiddleware, addFood);
router.post('/detect', authMiddleware, detectFood);
router.get('/daily', authMiddleware, getDailyFood);
router.get('/weekly', authMiddleware, getWeeklyFood);
router.get('/monthly', authMiddleware, getMonthlyFood);
router.delete('/:id', authMiddleware, deleteFood);
router.put('/:id', authMiddleware, updateFood);

module.exports = router;
