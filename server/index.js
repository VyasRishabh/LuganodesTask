const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const trackDeposits = require('./services/depositTracker'); // Ensure this function returns an array
require('dotenv').config();
const Deposit = require('./models/Deposit');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Telegram bot setup
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Replace with your chat ID or group ID

async function sendTelegramNotification(message) {
  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: message
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}

app.get('/', (req, res) => { 
  res.send('Ethereum Deposit Tracker Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Update trackDeposits function to send notifications
async function trackDepositsWithNotification() {
  try {
    const newDeposits = await trackDeposits(); // Ensure this function always returns an array
    if (newDeposits && newDeposits.length > 0) { // Added null/undefined check
      const message = `New deposits detected:\n${newDeposits.map(deposit => 
        `Block: ${deposit.blockNumber}, Hash: ${deposit.hash}, Amount: ${deposit.amount}`).join('\n')}`;
      await sendTelegramNotification(message);
    }
  } catch (error) {
    console.error('Error tracking deposits:', error);
  }
}

setInterval(trackDepositsWithNotification, 30000);

app.get('/deposits', async (req, res) => {
  try {
    const deposits = await Deposit.find();
    res.json(deposits);
  } catch (err) {
    console.error('Error retrieving deposits:', err); 
    res.status(500).send('Error retrieving deposits');
  }
}); 
 