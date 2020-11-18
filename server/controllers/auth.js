const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../utils/config');
const validateRegistrationInput = require('../validation/validateRegistrationInput');
const validateLoginInput = require('../validation/validateLoginInput');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (isCorrectPassword) {
        const userForToken = {
          id: user._id,
          email: user.email,
          handle: user.handle,
        };

        const token = jwt.sign(userForToken, config.JWT_SECRET);

        res.status(200).send({ token });
      } else {
        res.status(400).json({ error: 'Wrong email or password!' });
      }
    } else {
      res.status(400).json({ error: 'User does not exist!' });
    }
  } catch (error) {
    res.json({ error: 'Something went wrong!' });
  }
});

authRouter.post('/signup', async (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { email, password, handle } = req.body;
    const foundUserWithEmail = await User.findOne({ email });
    const foundUserWithHandle = await User.findOne({ handle });

    if (foundUserWithEmail && foundUserWithHandle) {
      res.status(400).json({
        handle: 'This handle is already taken!',
        email: 'This email is already taken!',
      });
    } else if (foundUserWithEmail) {
      res.status(400).json({ email: 'This email is already taken!' });
    } else if (foundUserWithHandle) {
      res.status(400).json({ handle: 'This handle is already taken!' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: hashedPassword,
        handle,
      };

      const createdUser = await User.create(newUser);
      const userForToken = {
        id: createdUser._id,
        email: createdUser.email,
        handle: createdUser.handle,
      };

      const token = jwt.sign(userForToken, config.JWT_SECRET);

      res.status(201).send({ token });
    }
  } catch (error) {
    res.json({ error: 'Something went wrong!' });
  }
});

module.exports = authRouter;
