# 📰 NewsMantra

Stay updated with the latest news, trending stories, and current affairs — all in one place. **NewsMantra** is a full-stack web app that allows users to explore news from top Indian newspapers and create their own article collections. 🌏✨

---

## ✨ Features

- 🔐 **User Authentication**
  - Google Sign-In via OAuth2
  - JWT-based session handling
  - User info stored securely in MongoDB

- 🧠 **Smart Local Storage**
  - Guest users can save articles locally (browser storage)
  - Data syncs to MongoDB upon login

- 📰 **News Feeds from Trusted Sources**
  - Get curated news from:
    - The Hindu
    - Times of India
    - Indian Express
    - Economic Times
    - Hindustan Times
  - Also shows **Famous Stories** & **Current Affairs**

- ✍️ **User-Created Articles**
  - Authenticated users can write and save personal articles to MongoDB

---

## 🔧 Tech Stack

### 💻 Frontend
- React
- Vite
- Tailwind CSS

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for auth

### 🔐 Authentication
- Google OAuth 2.0

### 🌐 External APIs
- [NewsAPI](https://newsapi.org)
- [GNews](https://gnews.io)

---

## 🗃 Project Structure

```bash
/backend
  ├── server.js         # Express backend
  ├── routes/           # API routes (auth, articles, news)
  ├── Config/db.js      # MongoDB connection setup

/src (React frontend)
/dist (Build output)

.env                   # Environment variables (Mongo URI, Google OAuth, etc.)
