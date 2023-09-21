const { Thought, User } = require('../models');

const thoughtControl = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => 
                //return all thoughts
                res.json(dbThoughtData))
            //error checking
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // Get a thought by its ID
    getThoughtById({ params }, res) {

        // find thought by id in the db
        Thought.findOne({ _id: params.id })

            .select('-__v')  // Exclude '__v' field from the result
            // populate the reactions field 

            //sort in descending order by the _id value
            .sort({ _id: -1 }) 

            //return the thought
            .then(dbThoughtData => {
                // If statement / no thought is found, send 404
                if (!dbThoughtData) {
                    // Sending send 404
                    res.status(404).json({ message: 'No ID' });
                    return;
                }
                // send json
                res.json(dbThoughtData);
            })

            //error checking
            .catch(err => {
                res.status(400).json(err);
            });
    },

    //create thought
    addThought({ body }, res) {
        Thought.create(body)
        //create thought
        .then((ThoughtData) => {
            return User.findOneAndUpdate(
        //create a thought using current user
            {
            id: body.userId
            }, {
                    //addtoset is a mongoDB operator
                    $addToSet: {
                        //push the thought to the user
                        thoughts: ThoughtData._id
                    }
                }, {
                    new: true
                }
            );
        })
        .then(userDb => {
            if (!userDb) {
                res.status(404).json({
                    message: 'No ID'
                });
                return;
            }
            res.json(userDb)
        })

        //error checking
        .catch(err => {
            res.status(400).json(err);
        });
},

    //update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({
            //find thought by id
                _id: params.thoughtId
            }, {
                //update thought
                $set: body
            }, {
                //validate the update
                runValidators: true,
                //return the updated thought
                new: true
            })
            .then(updateThought => {
                if (!updateThought) {
                    //return 404
                    return res.status(404).json({
                        message: 'No ID!'
                    });
                }
                return res.json({
                    message: "IT WORKED"
                });
            })
            //error checking
            .catch(err => 
                res.json(err));
    },

    //delete thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({
                _id: params.thoughtId
            })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({
                        message: 'No thought with this id!'
                    });
                }
                //return deleted thought
                return User.findOneAndUpdate({
                    //find user by id
                    thoughts: params.thoughtId
                }, {
                    //pull thought
                    $pull: {
                        //thoughts array
                        thoughts: params.thoughtId
                    }
                }, {
                    new: true
                });
            })
            .then(userDb => {
                if (!userDb) {
                    res.status(404).json({
                        message: 'No thought with this id!'
                    });
                    return;
                }
                res.json(userDb);
            })
            .catch(err => res.json(err));
    },

    //create reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $push: {
                    reactions: body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(updatedThought => {
                if (!updatedThought) {
                    res.status(404).json({
                        message: 'No reaction found on this id!'
                    });
                    return;
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    // Delete a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId},
        //allows to remove the reaction by id
        {
            //pull the reaction
            $pull: {
                //reactions array
                reactions: {
                    reactionId: params.reactionId
                }
            }
        }, {
            new: true
        }
    )
    .then((thought) => {
        if (!thought) {
            res.status(404).json({
                message: 'No reaction found on this id!'
            });
            return;
        }
        res.json(thought)
        //catch error
    })
    .catch(err => res.json(err));
},
}

//export thoughtControl
module.exports = thoughtControl;
