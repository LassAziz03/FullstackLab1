# MMA Video Library

## DA219B Fullstack Lab

MMA Video Library is a fullstack web application built with:
- React + Vite
- Express.js
- MongoDB Atlas

The application lets users:
- Register and log in
- Create categories
- Add MMA videos
- Edit video content
- Delete videos
- Search videos
- Add notes to videos

# Installation

## 1. Clone the repository

git clone https://github.com/LassAziz03/FullstackLab1.git

## 2. Open the project folder

cd FullstackLab1

## 3. Install root dependencies

npm install

## 4. Install frontend dependencies

cd client
npm install

## 5. Install backend dependencies

cd ../server
npm install


# Environment Variables

Create a `.env` file inside the `server` folder.

MONGO_URI=your_mongodb_connection_string
PORT=3000

---

# Run the Project

From the root folder:

npm run dev

Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:3000


# Technologies Used

## Frontend
- React
- Vite

## Backend
- Express.js
- Node.js

## Database
- MongoDB Atlas
- Mongoose

## Other Libraries
- dotenv
- cors
- concurrently

# GitHub Repository

https://github.com/LassAziz03/FullstackLab1