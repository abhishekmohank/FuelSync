const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  calories: {
    type: Number,
    required: true,
    default: 2000,
  },
  protein: {
    type: Number,
    required: true,
    default: 150,
  },
  carbs: {
    type: Number,
    required: true,
    default: 250,
  },
  fat: {
    type: Number,
    required: true,
    default: 65,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Goals', goalsSchema);
