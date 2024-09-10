const mongoose = require('mongoose');

const DepositSchema = new mongoose.Schema({
  blockNumber: Number,
  blockTimestamp: String,
  fee: String,
  hash: { type: String, unique: true },
  pubkey: String,
  sender: String,
  amount: String,  // Add amount field (in Ether)
});

module.exports = mongoose.model('Deposit', DepositSchema);
