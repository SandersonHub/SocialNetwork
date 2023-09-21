// handle routes for thoughts
const router = require('express').Router();

//require models
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtControl');

// /api/thoughts
// follow the routes below

//localhost:3001/api/thoughts
router.route('/').get(getAllThoughts).post(addThought);

//localhost:3001/api/thoughts/thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(removeThought);

//localhost:3001/api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//localhost:3001/api/thoughts/thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;