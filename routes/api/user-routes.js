const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userControl');

//api/users
//follow the pattern below

//localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

//localhost:3001/api/users/id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//localhost:3001/api/users/userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend);

//localhost:3001/api/users/userId/friends/friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;