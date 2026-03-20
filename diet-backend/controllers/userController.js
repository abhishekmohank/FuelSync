const Goals = require('../models/Goals');

const getGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    let goals = await Goals.findOne({ userId });

    if (!goals) {
      goals = new Goals({
        userId,
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 65,
      });
      await goals.save();
    }

    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { calories, protein, carbs, fat } = req.body;

    let goals = await Goals.findOne({ userId });

    if (!goals) {
      goals = new Goals({ userId });
    }

    if (calories) goals.calories = calories;
    if (protein) goals.protein = protein;
    if (carbs) goals.carbs = carbs;
    if (fat) goals.fat = fat;

    goals.updatedAt = Date.now();
    await goals.save();

    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGoals,
  updateGoals,
};
