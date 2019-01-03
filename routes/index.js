const express = require ('express');
const controller = require('../controllers/index');

const router = express.Router();

router.route('/api/v1/meetups')
  .post(controller.meetupCreate)
  .get(controller.getAllMeetups);

  router.route('/api/v1/meetups/upcoming/')
  .get(controller.getUpcomingMeetups);

  router.route('/api/v1/meetups/:id')
  .get(controller.getMeetupById);

  router.route('/api/v1/questions')
  .post(controller.createQuestion);

  router.route('/api/v1/questions/:id/upvote')
  .patch(controller.upVote);

router.route('/api/v1/questions/:id/downvote')
  .patch(controller.downVote);

router.route('/api/v1/meetups/:id/rsvps')
  .post(controller.rsvps);

module.exports = router;