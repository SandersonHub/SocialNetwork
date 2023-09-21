//imports mongoose

const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); //imports reactionSchema from Reaction.js

//creates new Mongoose Schema, which is ThoughtSchema
const ThoughtSchema = new Schema(
  {
    //thoughtText is a required string
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


//virtual to get total count of reactions
ThoughtSchema.virtual('reactionAmount').get(function () {
  //returns length of the thought's reactions array
  return this.reactions.length;
});

//creates the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//exports Thought model
module.exports = Thought;
