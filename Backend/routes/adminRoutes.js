const express = require('express');
const { User, Job, Payment, Feedback } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

const requireAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

router.get('/stats', auth, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalJobs = await Job.count();
    const completedJobs = await Job.count({ where: { status: 'completed' } });
    const totalPayments = await Payment.count();
    const feedbackCount = await Feedback.count({ where: { status: 'approved' } });
    res.json({ totalUsers, totalJobs, completedJobs, totalPayments, feedbackCount });
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch admin stats' });
  }
});

router.get('/users', auth, requireAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

module.exports = router;
