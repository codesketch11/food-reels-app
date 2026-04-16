# 🍔 Food Reels Platform (MERN)

A full-stack food reels application inspired by Instagram Reels, where users can explore, like, and save food videos, and food partners can upload and manage their own content.

---

## 🚀 Features

### 👤 User

* 🔐 Register & Login (JWT Authentication with cookies)
* 🎥 Browse food reels (video-based UI)
* ❤️ Like food items
* 📌 Save food items
* 🧾 View saved meals
* 🏪 Visit food partner profiles

### 🧑‍🍳 Food Partner

* 🔐 Register & Login
* 👤 Profile with uploaded food items
* 🎥 Upload food reels (video + description)
* ➕ Create new food items
* 🚪 Logout functionality

---

## 🧠 Tech Stack

### Frontend

* React (Vite)
* Custom CSS (mobile-first UI)
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cookie-based auth (httpOnly)

---

## 🔐 Authentication & Security

* JWT stored in cookies
* Role-based access (User vs Food Partner)
* Protected routes for content creation
* Secure API calls using `withCredentials`

---

## 📂 Project Structure

```
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers & logic
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API endpoint definitions
│   │   ├── middlewares/    # Custom middleware 
│   │   ├── services/       # 3rd party integrations
│   │   ├── db/             # Database connection setup
│   │   └── app.js          # App configuration
│   └── server.js           # Entry point / Server start
│
└── Frontend/
    ├── src/
    │   ├── assets/         # Images, and static files
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Full-page views
    │   ├── routes/         # Client-side routing logic
    │   ├── styles/         # CSS or Sass files
    │   ├── App.jsx         # Root component
    │   └── main.jsx        # App entry point

```

---

## ⚙️ Installation

### 1. Clone repo

```
git clone https://github.com/codesketch11/food-reels-app.git
```

### 2. Backend setup

```
cd Backend
npm install
```

Create `.env`:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run:

```
npm run dev
```

---

### 3. Frontend setup

```
cd Frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints (sample)

* `POST /api/auth/user/login`
* `POST /api/auth/food-partner/login`
* `GET /api/food`
* `POST /api/food`
* `GET /api/food-partner/:id`

---

## 📸 Screens & Flow

* User login → reels feed
* Like & Save functionality
* Saved items page
* Food partner profile
* Create food item (video upload)

---

## 🎯 Key Highlights

* Full end-to-end application (frontend + backend)
* Role-based system (User vs Creator)
* Video-first UI experience
* Clean routing and protected flows

---

## 🙌 Author

Built with focus on real-world product thinking and scalable architecture.
