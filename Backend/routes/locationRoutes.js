const express = require('express');
const { Location } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch locations' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { latitude, longitude, address, jobId } = req.body;
    const location = await Location.create({
      userId: req.user.id,
      jobId,
      latitude,
      longitude,
      address,
    });
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: 'Unable to save location' });
  }
});

module.exports = router;
