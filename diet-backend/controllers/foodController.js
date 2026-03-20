const FoodEntry = require('../models/FoodEntry');
const { detectFoodFromImage } = require('../utils/openaiUtils');

const addFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const { foodName, calories, protein, carbs, fat, date } = req.body;

    const foodEntry = new FoodEntry({
      userId,
      foodName,
      calories,
      protein,
      carbs,
      fat,
      date: date ? new Date(date) : new Date(),
    });

    await foodEntry.save();

    res.status(201).json(foodEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const detectFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const { image, date } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const detectedData = await detectFoodFromImage(image);

    const foodEntry = new FoodEntry({
      userId,
      foodName: detectedData.foodName,
      calories: detectedData.calories,
      protein: detectedData.protein,
      carbs: detectedData.carbs,
      fat: detectedData.fat,
      detectedByAI: true,
      date: date ? new Date(date) : new Date(),
    });

    await foodEntry.save();

    res.status(201).json(foodEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDailyFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const entries = await FoodEntry.find({
      userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    }).sort({ date: -1 });

    const totals = entries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fat: acc.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    res.json({
      entries,
      totals,
      date: date.toISOString().split('T')[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWeeklyFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const entries = await FoodEntry.find({
      userId,
      date: { $gte: startOfWeek, $lt: endOfWeek },
    }).sort({ date: -1 });

    const dailyTotals = {};
    entries.forEach((entry) => {
      const dayKey = entry.date.toISOString().split('T')[0];
      if (!dailyTotals[dayKey]) {
        dailyTotals[dayKey] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      }
      dailyTotals[dayKey].calories += entry.calories;
      dailyTotals[dayKey].protein += entry.protein;
      dailyTotals[dayKey].carbs += entry.carbs;
      dailyTotals[dayKey].fat += entry.fat;
    });

    res.json({
      entries,
      dailyTotals,
      weekStart: startOfWeek.toISOString().split('T')[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMonthlyFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const entries = await FoodEntry.find({
      userId,
      date: { $gte: startOfMonth, $lt: endOfMonth },
    }).sort({ date: -1 });

    const dailyTotals = {};
    entries.forEach((entry) => {
      const dayKey = entry.date.toISOString().split('T')[0];
      if (!dailyTotals[dayKey]) {
        dailyTotals[dayKey] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      }
      dailyTotals[dayKey].calories += entry.calories;
      dailyTotals[dayKey].protein += entry.protein;
      dailyTotals[dayKey].carbs += entry.carbs;
      dailyTotals[dayKey].fat += entry.fat;
    });

    res.json({
      entries,
      dailyTotals,
      monthStart: startOfMonth.toISOString().split('T')[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const foodId = req.params.id;

    const entry = await FoodEntry.findOneAndDelete({
      _id: foodId,
      userId,
    });

    if (!entry) {
      return res.status(404).json({ error: 'Food entry not found' });
    }

    res.json({ message: 'Food entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const foodId = req.params.id;
    const { foodName, calories, protein, carbs, fat } = req.body;

    const entry = await FoodEntry.findOneAndUpdate(
      { _id: foodId, userId },
      {
        foodName,
        calories,
        protein,
        carbs,
        fat,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Food entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFood,
  detectFood,
  getDailyFood,
  getWeeklyFood,
  getMonthlyFood,
  deleteFood,
  updateFood,
};
