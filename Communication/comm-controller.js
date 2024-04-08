const express = require('express');
const app = (module.exports = express());
const message = require('./comm-service');

app.post('/be/mail', async (req, res) => {
  try {
    await message.sendEmail(req.body.email);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
