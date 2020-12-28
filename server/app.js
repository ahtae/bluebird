const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const path = require('path');
const {
  postRouter,
  authRouter,
  userRouter,
  notificationRouter,
} = require('./controllers');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

if (config.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '..', 'client/build')));
}

app.use('/api/notifications', notificationRouter);
app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
