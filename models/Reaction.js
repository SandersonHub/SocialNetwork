//importing mongoose
const { Schema, Types } = require('mongoose');

//imports new Mongoose Schema, which is named reactionSchema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, //identifies docs
      //if a reaction id is not provided, will generate a new 
      default: () => new Types.ObjectId(),
    },
    //body of conttent for the reaction
    reactionBody: {
      type: String,
      required: true,
      maxlength: 250,
      minlength: 4,
    },
    //username of the user who created the reaction
    username: {
        type: String,
        required: true,
        max_length: 50,
    },
    //timestamp of the reaction
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    //includes any vituiral properties
    toJSON: {
      getters: true,
    },
    id: false, //prevents virtuals from creating duplicate of _id as id
  }
);

module.exports = reactionSchema;