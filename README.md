# 🌐 Ethereum Deposit Tracker

> A real-time tracker for Ethereum deposits using Web3 and MongoDB. This project monitors Ethereum blockchain deposits to a specific contract address and displays them in a React frontend.

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Ready-brightgreen)](https://www.mongodb.com/)
[![Web3](https://img.shields.io/badge/Web3-Enabled-blue)](https://web3js.readthedocs.io/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB)](https://reactjs.org/)

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Setup](#-setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#-usage)
- [Backend Functionality](#-backend-functionality)
- [Frontend Functionality](#-frontend-functionality)
- [Dependencies](#-dependencies)
- [Screenshots](#-screenshots)
- [Telegram Notifications](#-telegram-notifications)

---

## 🛠 Prerequisites

Before you begin, ensure you have the following:

- ✅ Node.js (v14 or later)
- ✅ MongoDB (local or Atlas)
- ✅ Alchemy API Key (for Ethereum network interaction)
- ✅ Ethereum Contract Address (for tracking deposits)

> 💡 Join the Telegram group to get notifications on Ethereum deposits.

---

## 🚀 Setup

### Backend

1. **Clone the Repository**

2. **Create a .env File**

   In the server directory, create a `.env` file with the following details:

   ```env
   MONGO_URI=mongodb+srv://rishabh38889:HbK5wDbCNx1S68hv@cluster0.h7vy0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ALCHEMY_URI=wss://eth-sepolia.g.alchemy.com/v2/IBdoMhXP2ZpDTn6pY8y3eD1Tuei8JBv-
   CONTACT_ADDRESS=0x00000000219ab540356cBB839Cbe05303d7705Fa
   TELEGRAM_BOT_TOKEN=7539198642:AAFjDru7L_Ieqb7BnbIlLD38dEd9cKBhS2M
   TELEGRAM_CHAT_ID=-1002238864941
   ```

3. **Start the Backend Server**

   ```bash
   nodemon index.js
   ```

   > 🌐 The server will run on `http://localhost:5000` by default.

### Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd client
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Frontend**

   ```bash
   npm start
   ```

   > 🖥️ The frontend will be available at `http://localhost:3000`.

---

## 📘 Usage

To use the Ethereum Deposit Tracker:

1. 🦊 Install the Phantom wallet and switch to the Testnet using Developer Tools.
2. 💰 Add Sepolia test ETH using the faucet.
3. 💸 Initiate a payment to the contract address specified in the `.env` file.
4. 👀 Monitor the website to see updates on Ethereum deposits.

---

## 🔧 Backend Functionality

The backend subscribes to Ethereum blocks and monitors transactions to a specified contract address. It stores deposit information in MongoDB and sends real-time updates to connected clients using Socket.IO.

**Key Function:**

- `trackDeposits`: 🔍 This function listens to new Ethereum blocks, processes the transactions, and checks if they are related to the specified contract address. Any new deposit is saved to MongoDB and sent to connected clients.

---

## 🖥️ Frontend Functionality

The frontend fetches deposit data from the backend and displays it in a real-time table.

**Key Features:**

- 🔄 **Real-Time Updates**: The table displays details such as Block Number, Timestamp, Transaction Hash, Public Key, Sender, and Amount. It updates live as new deposits are detected.
- 🔌 **Socket.IO Integration**: The frontend listens for `newDeposit` events from the backend, ensuring real-time updates.

---

## 📦 Dependencies

| Dependency | Purpose |
|------------|---------|
| `web3` | 🌐 For interacting with the Ethereum blockchain |
| `mongoose` | 🗄️ For MongoDB operations |
| `dotenv` | 🔐 For managing environment variables |
| `socket.io` | 🔄 For real-time communication between backend and frontend |

---

## 📸 Screenshots

### Frontend Interface

<p align="center">
  <img src="https://github.com/VyasRishabh/LuganodesTask/blob/master/IMG1.png" alt="Frontend Screenshot 1" width="80%">
</p>

> The Ethereum Deposit Tracker frontend displaying real-time deposit information.

<p align="center">
  <img src="https://github.com/VyasRishabh/LuganodesTask/blob/master/IMG2.png" alt="Frontend Screenshot 2" width="80%">
</p>

> Detailed view of deposit transactions in the tracker.

<p align="center">
  <img src="https://github.com/VyasRishabh/LuganodesTask/blob/master/IMG3.png" alt="Frontend Screenshot 3" width="80%">
</p>

> Additional features and information displayed on the tracker interface.

---

## 📱 Telegram Notifications

<p align="center">
  <img src="https://github.com/VyasRishabh/LuganodesTask/blob/master/IMG4.PNG" alt="Telegram Notifications" width="50%">
</p>

> Real-time Telegram notifications for new Ethereum deposits, keeping you informed on-the-go.

---

<p align="center">
  Made with ❤️ by [Rishabh Vyas(21BCE0871)]
</p>
