import User from '../models/userModel.js';

// handle errors
const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already used';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
};


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
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
  res.send('new signup');
};

export const login_post = async (req, res) => {
  res.send('user login');
};
