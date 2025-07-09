import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    minLingth: 6,
  },
});

const User = mongoose.model('user', userSchema);

export default User;
