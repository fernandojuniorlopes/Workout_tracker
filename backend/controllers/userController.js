// Example logic for user registration
const User = require('../models/userModel'); // Import your user model
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

const userController = {
  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        logger.error('Invalid email or password for user: '+ user.username);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        logger.error('Invalid email or password for user: '+ user.username);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      logger.info('Login successful for user: ' + user.username);

      res.json({userId: user._id });
    } catch (err) {
      logger.error('Login failed: ' + err );
      res.status(500).json({ message: 'Login failed' });
    }
  },
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