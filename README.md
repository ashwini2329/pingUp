# 💬 Real-Time Chat App

A full-stack **real-time chat application** built using the **MERN stack** with **Socket.IO** for instant communication. Users can register, log in, and chat with others in **one-to-one** or **group chats**. The app is secure, mobile-friendly, and built with scalability in mind.

---

## 🚀 Features

### 🔐 Authentication
- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Avatar Upload

### 💬 Chat System
- ✅ Real-time Messaging via Socket.IO
- ✅ Typing Indicators
- ✅ Read Receipts & Timestamps
- ✅ Chat List (Like WhatsApp)
- ✅ One-to-One & Group Chats

### 📦 Data Persistence
- ✅ MongoDB for storing messages, users, and chats
- ✅ Online/Last Seen Tracking
- ✅ Auto-scroll to latest messages

### 🔒 Security
- ✅ Input Validation
- ✅ Rate Limiting
- ✅ Secure JWT Handling

### 🌈 UI/UX
- ✅ Mobile Responsive Design
- ✅ TailwindCSS Styling (or custom CSS)
- ✅ Dark Mode Support (Optional)
- ✅ Emoji Picker & Media Uploads (Optional)

---

## 🧠 Architecture Overview

Client (React)
│
├── REST API Calls (Axios/Fetch)
├── Socket.IO client
│
Server (Node.js + Express)
│
├── Auth & Chat Routes
├── Socket.IO Server
│
Database (MongoDB via Mongoose)
├── Users Collection
├── Messages Collection
├── Chats Collection




---

## 🛠️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React.js, TailwindCSS  |
| Backend    | Node.js, Express       |
| Real-Time  | Socket.IO              |
| Database   | MongoDB + Mongoose     |
| Auth       | JWT                    |
| Optional   | Redis, Cloudinary      |
| Deploy     | Render, Vercel, Railway, Netlify |

---

## 📁 Folder Structure

### Backend (`/server`)
server/
├── controllers/
├── models/
├── routes/
├── sockets/
├── utils/
├── app.js
└── server.js


### Frontend (`/client`)
client/
├── components/
├── pages/
├── context/
├── hooks/
└── App.jsx



---

## ✨ Optional Add-Ons

| Feature                | Benefit                          |
|------------------------|----------------------------------|
| ✅ Group Chats         | Chat with multiple users         |
| ✅ Media Upload        | Images, files via Cloudinary     |
| ✅ Emoji Picker        | Friendlier UI                    |
| ✅ Edit/Delete Message | Like Telegram                    |
| ✅ Search Users/Chats  | Easy navigation                  |
| ✅ Notifications       | Web push or in-app               |
| ✅ PWA Support         | Mobile installable app           |
| ✅ Admin Panel         | Moderate users & content         |

---

## 🧪 Testing & Deployment

- **Testing**:  
  - Unit tests with **Jest**  
  - Manual flow testing (login, messaging, refresh, logout)

- **Deployment**:
  - Frontend: [Vercel](https://vercel.com) / [Netlify](https://www.netlify.com)
  - Backend: [Render](https://render.com) / [Railway](https://railway.app)
  - Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🧩 Getting Started

### 1. Clone the Repository


git clone https://github.com/your-username/chat-app.git
cd chat-app


Install Dependencies
# Backend
cd server
npm install

# Frontend
cd ../client
npm install

Run the app
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm run dev


🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.

📜 License
This project is open-source and available under the MIT License.


📧 Contact
For questions, suggestions, or collaboration, feel free to reach out!
