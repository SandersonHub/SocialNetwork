const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'thought', //Thought model
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // self-reference to the User model
    },
  ],
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length});
  
const User = mongoose.model('ser', userSchema);

module.exports = User;