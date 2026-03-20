const express = require('express');
const authMiddleware = require('../middleware/auth');
const { askNutritionAssistant } = require('../utils/openaiUtils');

const router = express.Router();

router.post('/nutrition', authMiddleware, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const reply = await askNutritionAssistant(messages);

    return res.json({
      reply,
      disclaimer:
        'This assistant is for educational guidance only and is not a medical diagnosis. Please consult a licensed clinician for personal medical advice.',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to process chat request' });
  }
});

module.exports = router;