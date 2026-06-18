const express = require('express');
const { Feedback } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.findAll({ where: { status: 'approved' } });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch feedback' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { jobId, rating, comment } = req.body;
    const feedbackItem = await Feedback.create({
      userId: req.user.id,
      jobId,
      rating,
      comment,
      status: 'pending',
    });
    res.status(201).json(feedbackItem);
  } catch (err) {
    res.status(500).json({ error: 'Unable to submit feedback' });
  }
});

module.exports = router;
