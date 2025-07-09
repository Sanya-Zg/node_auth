import User from '../models/userModel.js';

export const signup_get = (req, res) => {
  res.render('signup');
};

export const login_get = (req, res) => {
  res.render('login');
};

export const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send('error, user not created.');
  }
  res.send('new signup');
};

export const login_post = async (req, res) => {
  res.send('user login');
};
