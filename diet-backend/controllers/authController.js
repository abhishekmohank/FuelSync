const User = require('../models/User');
const Goals = require('../models/Goals');
const { generateToken } = require('../utils/tokenUtils');

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Create default goals
    const goals = new Goals({
      userId: user._id,
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 65,
    });
    await goals.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('[Auth] Login failed: user not found for email', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('[Auth] Login failed: invalid password for email', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    console.log('[Auth] Login successful for email', email);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('[Auth] Login error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};
