const express = require('express');
const { Message } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { senderId: req.user.id, receiverId: req.params.userId },
          { senderId: req.params.userId, receiverId: req.user.id }
        ],
      },
      order: [['createdAt', 'ASC']],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch messages' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, message, jobId } = req.body;
    const newMessage = await Message.create({
      senderId: req.user.id,
      receiverId,
      jobId,
      message,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Unable to send message' });
  }
});

module.exports = router;
