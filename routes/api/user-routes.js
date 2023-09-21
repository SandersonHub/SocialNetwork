const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userControl');

//api/users

//localhost:3001/api/users
router.route('/').get(getAllUsers).post(createUser);

//localhost:3001/api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

//localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;