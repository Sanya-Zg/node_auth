import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// middleware
app.use(express.static('public'));

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
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
