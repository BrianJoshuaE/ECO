const express = require('express');
const { Payment, Job } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.findAll({ where: { userId: req.user.id } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch payments' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { jobId, amount, method, transactionId } = req.body;
    const payment = await Payment.create({
      userId: req.user.id,
      jobId,
      amount,
      method,
      transactionId,
      status: 'completed',
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

module.exports = router;
