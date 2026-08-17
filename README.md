# 🚀 BlockLearn – AI Enhanced, Gamified Skill Swap Ecosystem

<p align="center">
  <strong>Empowering Peer-to-Peer Learning with Blockchain, AI Matching, and Real-Time Communication.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-success?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/Solidity-Web3-black?style=for-the-badge&logo=solidity"/>
  <img src="https://img.shields.io/badge/WebRTC-Video%20Calling-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Socket.IO-Real--Time-lightgrey?style=for-the-badge&logo=socket.io"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"/>
</p>

---

## 📖 About BlockLearn

**BlockLearn** is a decentralized peer-to-peer skill exchange platform that enables learners and mentors to collaborate through secure, real-time communication while leveraging blockchain technology for transparent skill verification and reputation management.

Instead of traditional paid learning platforms, BlockLearn encourages users to **exchange knowledge** by teaching the skills they possess and learning new skills from others.

The platform combines **Web3**, **real-time communication**, and **modern web technologies** to create a trusted and interactive learning ecosystem.

---

# ✨ Key Features

### 🔐 Secure Authentication

* Email OTP verification
* Google OAuth Login
* JWT Authentication
* Secure Session Management

---

### 🤝 Intelligent Skill Matching

* Skill-based recommendations
* Interest-based pairing
* Smart mentor-learner matching
* Personalized learning suggestions

---

### 💬 Real-Time Communication

* Instant messaging
* Live notifications
* Socket.IO powered chat
* Real-time collaboration

---

### 🎥 HD Video Calling

* WebRTC Peer-to-Peer Video Calls
* Screen sharing support
* Low latency communication
* Multi-user conferencing

---

### ⛓ Blockchain Verification

* Smart contract based skill verification
* Immutable learning records
* Blockchain reputation system
* Certificate verification
* Trustless skill validation

---

### ⭐ Reputation & Feedback

* Session ratings
* Mentor reviews
* Skill endorsements
* Reputation scoring

---

### 👨‍💼 Admin Dashboard

* User management
* Session monitoring
* Report handling
* Content moderation
* Platform analytics

---

### 👥 Mentor ↔ Admin Communication

* Dedicated video meeting system
* Secure room joining
* Role-based access
* Live chat during meetings

---

# 🏗 System Architecture

```text
                     +-------------------+
                     |   React Frontend  |
                     +---------+---------+
                               |
                               |
                      REST APIs + Socket.IO
                               |
                               ▼
                  +-------------------------+
                  | Node.js + Express API   |
                  +-----------+-------------+
                              |
                +-------------+-------------+
                |                           |
                ▼                           ▼
        MongoDB Database          WebRTC + PeerJS
                |                           |
                └-------------+-------------┘
                              |
                              ▼
                     Solidity Smart Contracts
                              |
                              ▼
                          Ethereum Network
```

---

# 🛠 Tech Stack

## Frontend

* React 18
* Vite
* Tailwind CSS
* React Router
* Socket.IO Client
* Axios
* WebRTC

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* Nodemailer
* Google OAuth

---

## Blockchain

* Solidity
* Hardhat
* Ethereum
* Smart Contracts

---

## Video Communication

* React-WebRTC
* PeerJS
* Socket.IO

---

# 📂 Project Structure

```text
BlockLearn/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── components/
│
├── React-webRTC/
│   ├── client/
│   └── server/
│
├── contracts/
│
├── scripts/
│
├── tests/
│
├── README.md
│
└── package.json
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/shankarbelavi/BlockLearn.git
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd ../frontend
npm install
```

---

## Install WebRTC Server

```bash
cd ../React-webRTC/server
npm install
```

---

# 🔑 Environment Variables

Create a **.env** file inside the backend directory.

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GOOGLE_CLIENT_ID=YOUR_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET

EMAIL_USER=YOUR_EMAIL

EMAIL_PASS=YOUR_EMAIL_PASSWORD
```

> ⚠️ Never commit your `.env` file to GitHub. Add it to `.gitignore`.

---

# ▶ Running the Project

## Backend

```bash
cd backend
npm run dev
```

---

## Frontend

```bash
cd frontend
npm run dev
```

---

## WebRTC Server

```bash
cd React-webRTC/server
npm start
```

---

# 🚀 Core Modules

### Authentication

* Email OTP Verification
* Google OAuth
* JWT Authentication

### User Profiles

* Skills
* Interests
* Experience
* Availability

### Skill Exchange

* Smart Pairing
* Mentor Discovery
* Learning Sessions

### Chat System

* Real-time Messaging
* Notifications
* Typing Indicators

### Video Calling

* One-to-One Calls
* Screen Sharing
* Live Chat

### Blockchain

* Certificates
* Reputation
* Smart Contracts
* Verification

### Feedback

* Ratings
* Reviews
* Skill Validation

### Admin

* Dashboard
* User Management
* Reports
* Moderation

---

# 📚 API Documentation

Detailed API documentation is available in:

```text
API_DOCS.md
```

---

# 🧪 Testing

### Unit Testing

```bash
npm test
```

### Integration Testing

```bash
npm run test:integration
```

### End-to-End Testing

```bash
npm run cypress
```

---

# 🌍 Deployment

| Service         | Platform         |
| --------------- | ---------------- |
| Frontend        | Vercel           |
| Backend         | Render / Railway |
| Database        | MongoDB Atlas    |
| Blockchain      | Ethereum Testnet |
| Smart Contracts | Hardhat          |

---

# 🤝 Contributing

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📈 Future Enhancements

* AI-powered mentor recommendation
* NFT Skill Certificates
* Token-based reward system
* Learning analytics dashboard
* Mobile application
* Multi-language support
* AI Interview Assistant
* Voice translation during calls


## 🌐 Live Demo

🚀 [View BlockLearn Live](https://shankarbelavi.github.io/BLOCKLEARN/)

---

# 👨‍💻 Developed By

**Shankar Belavi**

Computer Science Engineering

Blockchain • MERN Stack • WebRTC • React • Node.js • MongoDB • Solidity

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you found this project useful:

⭐ Star this repository

🍴 Fork it

🛠 Contribute to improve it

📢 Share it with the community

---

<p align="center">
  <strong>🌟 Learn • Teach • Connect • Grow 🌟</strong>
</p>

<p align="center">
Made with ❤️ using React, Node.js, MongoDB, WebRTC & Blockchain
</p>
