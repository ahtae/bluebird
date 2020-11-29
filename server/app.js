const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const postRouter = require('./controllers/post');
const authRouter = require('./controllers/auth');
const userRouter = require('./controllers/user');

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

app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message || 'Internal server error!');
});

module.exports = app;
