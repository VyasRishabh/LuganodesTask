const Deposit = require('../models/Deposit');
const Web3 = require('web3');
const logger = require('../logger');
const axios = require('axios');
require('dotenv').config();

const websocketProviderUrl = process.env.ALCHEMY_URI;
if (!websocketProviderUrl) {
  throw new Error('WebSocket provider URL is not defined in environment variables.');
}

const web3 = new Web3(new Web3.providers.WebsocketProvider(websocketProviderUrl));

const contractAddress = process.env.CONTACT_ADDRESS;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Replace with your chat ID or group ID

let latestDepositHash = ''; // To store the hash of the latest deposit

async function sendTelegramNotification(message) {
  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: message
    });
  } catch (error) {
    logger.error('Error sending Telegram notification:', error);
  }
}

const trackDeposits = () => {
  const subscribeToBlocks = () => {
    const subscription = web3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
      if (error) {
        logger.error('Error subscribing to new blocks:', error);
        return;
      }

      try {
        const block = await web3.eth.getBlock(blockHeader.number, true);

        if (!block.transactions || block.transactions.length === 0) {
          logger.info(`No transactions in block ${blockHeader.number}`);
          return;
        }

        await Promise.all(
          block.transactions.map(async (tx) => {
            if (tx.to && tx.to.toLowerCase() === contractAddress.toLowerCase()) {
              try {
                const existingDeposit = await Deposit.findOne({ hash: tx.hash });
                if (!existingDeposit) { 
                  const receipt = await web3.eth.getTransactionReceipt(tx.hash);
                  const amount = web3.utils.fromWei(tx.value, 'ether');
                  const deposit = new Deposit({  
                    blockNumber: tx.blockNumber,
                    blockTimestamp: new Date(block.timestamp * 1000),
                    fee: web3.utils.fromWei(tx.gasPrice, 'ether'),
                    hash: tx.hash,
                    pubkey: 'pubkey-placeholder',
                    sender: tx.from,
                    amount: amount, // Add the amount to the deposit object
                  });
                  await deposit.save();
                  logger.info('New deposit saved:', deposit);

                  // Check if this deposit is newer than the latest
                  if (latestDepositHash !== deposit.hash) {
                    latestDepositHash = deposit.hash; // Update latest deposit hash

                    // Send Telegram notification
                    const message = `New deposit detected:\nBlock: ${deposit.blockNumber}\nHash: ${deposit.hash}\nAmount: ${deposit.amount} ETH\nFee: ${deposit.fee} ETH\nSender: ${deposit.sender}`;
                    await sendTelegramNotification(message);
                  }
                } else {
                  logger.info('Existing deposit found:', existingDeposit);
                }
              } catch (error) {
                logger.error('Error processing transaction receipt:', error);
              }
            }
          })
        );
      } catch (error) {
        logger.error('Error processing block:', error);
      }
    });

    subscription.on('error', (error) => {
      logger.error('Error in block subscription:', error);
    });

    subscription.on('end', () => {
      logger.info('Subscription ended, reconnecting...');
      subscribeToBlocks();
    });
  };

  subscribeToBlocks();

  web3.currentProvider.on('error', (error) => {
    logger.error('WebSocket error:', error);
  });

  web3.currentProvider.on('end', () => {
    logger.info('WebSocket connection closed, reconnecting...');
    web3.setProvider(new Web3.providers.WebsocketProvider(websocketProviderUrl));
    subscribeToBlocks(); 
  });
};
 
module.exports = trackDeposits;