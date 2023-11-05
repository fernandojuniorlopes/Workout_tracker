// Example logic for user registration
const User = require('../models/userModel'); // Import your user model
const bcrypt = require('bcrypt');

const userController = {
  async registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

      // Create a new user with the hashed password
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.json({ message: 'Registration successful' });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed' });
    }
  },
  // Other controller methods
};

module.exports = userController;