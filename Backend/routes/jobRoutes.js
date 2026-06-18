const express = require('express');
const { Job, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { wasteType, description, pickupLocation, latitude, longitude, scheduledDate } = req.body;
    const job = await Job.create({
      clientId: req.user.id,
      wasteType,
      description,
      pickupLocation,
      latitude,
      longitude,
      scheduledDate,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Job creation failed' });
  }
});

router.get('/available', auth, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { status: 'pending' },
      include: [{ model: User, as: 'client', attributes: ['id', 'name', 'email', 'phone'] }],
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch jobs' });
  }
});

router.put('/:id/accept', auth, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    job.collectorId = req.user.id;
    job.status = 'accepted';
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Unable to accept job' });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const where = req.user.role === 'collector' ? { collectorId: req.user.id } : { clientId: req.user.id };
    const jobs = await Job.findAll({ where });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch jobs' });
  }
});

module.exports = router;
