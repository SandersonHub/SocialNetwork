const {User} = require('../models');

const userControl = {
    //get users
    getUsers(req, res) {
    User.find({})
    //populates reference doc in mongoDB
    .populate({
            path: 'thoughts',
            //allows to remove __v from visuals
            select: ('-__v')
        })
        // populates friends 
        //fetches friend doc from the user model
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        // sort by descending order by the _id value
        .sort({
            _id: -1
        })
        //
        .then(getUserData => 
            //returns user data
            res.json(getUserData))

        //catch error
        .catch(err => {
            res.status(500).json(err);
        });
},

    //get one user by id
    //params for request
    getUserById({params}, res) {
    User.findOne({
            _id: params.id
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(getAllUserData => res.json(getAllUserData))

        //catch error
        .catch(err => {
            res.sendStatus(400).json(err);
        });
},

    //create user
    createUser({body}, res) {
    User.create(body)
        .then(getAllUserData => res.json(getAllUserData))
        //catch error
        //status 400
        .catch(err => res.status(400).json(err));
},

    //update user by id
    updateUser({params,body}, res) {
    User.findOneAndUpdate({
            _id: params.id
        }, body, {
            new: true,
            runValidators: true
        })
        .then(getAllUserData => {
            if (!getAllUserData) {
                res.status(404).json({
                    message: 'No user with this ID.'
                });
                return;
            }
            res.json(getAllUserData);
        })

        //catch erroir
        .catch(err => 
            //status 400
            res.status(400).json(err));
},

    //delete user
    deleteUser({ params }, res) {
        //finds user by id and deletes
        User.findOneAndDelete({ _id: params.id })
        //returns user data
        .then(getAllUserData => {
            //if no user, return 404 error
            if (!getAllUserData) {
                res.status(404).json({ message: 'No user with this ID.' });
                return;
            }
            return getAllUserData;
        })
        //deletes user's friends
        //pulls the user's ID from friends array
        .then(getAllUserData => {
            return User.updateMany( //updates several docs at once
                { _id: { $in: getAllUserData.friends } }, //collects all data from friends
                { $pull: { friends: params.userId } } //pulls user ID from friends array
            ).then(() => {d
                //deletes user's thought from the ID
                return Thought.deleteMany({ username: getAllUserData.username });
            });
        })
        // return the deleted user
        .then(() => {
            res.json({ message: 'deleted' });
        })
        //catch error
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},
    

    //add friends
    addFriend({params}, res) {
        User.findOneAndUpdate({ _id: params.userId
         }, {
                //pushes friend to user's friend array
                $push: {
                    friends: params.friendId
                }
            }, {
                //validates the update
                new: true
            })
            .then(getAllUserData => {
                //catch error 404
                if (!getAllUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(getAllUserData);
            })
            //catch error
            .catch(err => {
                res.status(400).json(err);
            });
    },

// remove the friend
deleteFriend(req, res) {
    //para's for request
    const { params } = req;

    // find and delete the user with an ID
    User.findOneAndDelete({ _id: params.thoghtId })
        .then(deleteFriend => {

            // if no user, return 404
            if (!deleteFriend) {
                return res.status(404).json({ message: 'User not found' });
            }

            // update the user's friends list by removing the friend with the specified ID
            return User.findOneAndUpdate(
                { friends: params.friendId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
        })
        .then(getAllUserData => {
            // if the user was not found, return a 404 response
            if (!getAllUserData) {
                return res.status(404).json({ message: 'No ID found' });
            }

            // return the updated user data
            res.json(getAllUserData);
        })
        //catch 500 error
        .catch(err => res.status(500).json
        ({ message: 'error try again, internal', error: err }));
},
};


module.exports = userControl;
