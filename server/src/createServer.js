'use strict';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const productRouter = require('./routes/products.router');
const phoneRouter = require('./routes/phones.router');
const tabletsRouter = require('./routes/tablets.router');
const accessoriesRouter = require('./routes/accessories.router');
const cartRouter = require('./routes/cart.router');
const likeRouter = require('./routes/likes.router');
const errorMiddleware = require('./middlewares/error.middleware');

function createServer() {
  const app = express();

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(authRouter);
  app.use(userRouter);
  app.use(productRouter);
  app.use(phoneRouter);
  app.use(tabletsRouter);
  app.use(accessoriesRouter);
  app.use(cartRouter);
  app.use(likeRouter);

  // app.use(errorMiddleware);
  app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.message || err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  });

  return app;
}

module.exports = {
  createServer,
};
