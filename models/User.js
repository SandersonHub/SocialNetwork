const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  //username string
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true, //removes spaces before and after the string
  },
  //email string
  email: {
    type: String,
    required: true, //requires the email
    unique: true, //unique email
  },
  thoughts: [
    {
      //array of id values referencing to the thought model
      type: mongoose.Schema.Types.ObjectId,
      ref: 'thought', //Thought model
    },
  ],
  friends: [
    {
      //array of id values referencing the user 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', 
    },
  ],
});

//total amount of friends
userSchema.virtual('friendCount').get(function () {
  //return the length of the user's friends
  return this.friends.length});
  
const User = mongoose.model('user', userSchema);

module.exports = User;