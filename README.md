# 🍲 RecipeBox — Full Stack Recipe Sharing Platform

<p align="center">
  <b>A modern social platform for sharing recipes, built with MERN stack</b>
</p>

<p align="center">
  <a href="https://recipebox-wheat.vercel.app">
    <img src="https://img.shields.io/badge/Frontend-Live-green?style=for-the-badge&logo=vercel">
  </a>
  <a href="https://recipebox-0k0q.onrender.com">
    <img src="https://img.shields.io/badge/Backend-API-blue?style=for-the-badge&logo=render">
  </a>
  <img src="https://img.shields.io/badge/Made%20With-React%20%7C%20Node%20%7C%20MongoDB-orange?style=for-the-badge">
</p>

---

## 🚀 Live Demo
- 🌐 Frontend: https://recipebox-wheat.vercel.app  
- ⚙️ Backend: https://recipebox-0k0q.onrender.com  

---

## ✨ Features
- 👤 User system  
- 🍝 Create & share recipes  
- ❤️ Like recipes  
- 💬 Comment system  
- ⭐ Rating system  
- 🔍 Search by ingredients  
- 📰 Personalized feed  

---

## 🛠 Tech Stack
- Frontend: React (Vite)  
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- Deployment: Vercel + Render  

---

## ⚙️ Setup

### Backend
cd backend  
npm install  
node server.js  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## 📡 API Documentation

Base URL:
https://your-backend-url.onrender.com/api

---

## 🔍 GET /recipes

Fetch recipes with optional filters.

### Query Parameters

| Parameter   | Type   | Description                          |
|------------|--------|--------------------------------------|
| ingredient | string | Filter by ingredient                 |
| time       | number | Max cooking time (minutes)           |
| author     | string | Filter by author                     |
| rating     | number | Minimum rating                       |

### Example
GET /recipes?ingredient=chicken&time=30

---

## ➕ POST /recipes

Create a new recipe.

### Request Body
```json
{
  "title": "Chicken Rice",
  "description": "Simple dish",
  "ingredients": ["chicken", "rice"],
  "cookTime": 25
}
```

### Response
```json
{
  "message": "Recipe created successfully",
  "recipe": {
    "_id": "123",
    "title": "Chicken Rice",
    "description": "Simple dish",
    "ingredients": ["chicken", "rice"],
    "cookTime": 25
  }
}
```

---

## ❤️ POST /recipes/:id/like

Like a recipe.

### Example
POST /recipes/123/like

### Response
```json
{
  "message": "Recipe liked successfully"
}
```

---

## 💬 POST /recipes/:id/comment

Add a comment to a recipe.

### Request Body
```json
{
  "text": "Looks delicious!"
}
```

### Response
```json
{
  "message": "Comment added successfully"
}
```

---

## ⭐ POST /recipes/:id/rate

Rate a recipe.

### Request Body
```json
{
  "rating": 5
}
```

### Response
```json
{
  "message": "Rating submitted successfully"
}
```

---

## 👤 Authentication (Future Scope)

- JWT-based authentication
- Protected routes for creating recipes
- User login/signup system

---

## ⚠️ Error Responses

| Status Code | Meaning                |
|------------|------------------------|
| 400        | Bad Request            |
| 401        | Unauthorized           |
| 404        | Resource Not Found     |
| 500        | Internal Server Error  |

### Example
```json
{
  "error": "Recipe not found"
}
```

---

## ⚙️ Notes

- All data is stored in MongoDB Atlas
- Backend built using Express.js
- RESTful API design followed

---

## 👨‍💻 Author
Upendra