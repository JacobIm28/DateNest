import mongoose from 'mongoose';
import ExDate from './date.js';

// Schema for user that uses date schema
const userSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Mixed,
    required: true, 
    trim: true
  },
  dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExDate' }]
});

// Adding User schema to model
const User = mongoose.model('User', userSchema);

export default User;
