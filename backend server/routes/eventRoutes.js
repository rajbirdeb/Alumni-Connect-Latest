const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createEvent,
  getEvents,
  registerForEvent,
  getMyEvents,
  getRegisteredEvents
} = require('../controllers/eventController');

router.post('/', auth, createEvent);
router.get('/', auth, getEvents);
router.post('/:eventId/register', auth, registerForEvent);
router.get('/my-events', auth, getMyEvents);
router.get('/registered', auth, getRegisteredEvents);

module.exports = router;
