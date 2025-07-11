import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import { requireAuth, checkUser } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // create server
    app.listen(PORT, () => {
      console.log(`Server listen on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use(checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


