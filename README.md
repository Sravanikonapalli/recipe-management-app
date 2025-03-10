# Recipe Management Application

## Overview
This project is a full-stack Recipe Management Application built using the MERN stack (SQLite, Express.js, React, Node.js). It allows users to add, view, organize, and manage recipes efficiently.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** SQLite

---

## Features
- Add new recipes with title,images, instructions,description, categories, and cost.
- View a list of all available recipes.
- delete existing recipes.
---

## API Endpoints

### **1. Get all recipes**
**Endpoint:** `GET https://recipe-management-app-q93w.onrender.com/recipes`  
**Response:**
```json
[
  {
    "id": 1,
    "title": "Spaghetti Carbonara",
    "image": "https://assets.unileversolutions.com/recipes-v2/109396.jpg",
    "instructions": "Boil pasta, cook pancetta, mix with eggs, cheese, and pepper.",
    "categories": "Italian, Pasta",
    "cost": 12.99
  }
]

**2. Get single recipe**
**Endpoint:** `GET https://recipe-management-app-q93w.onrender.com/recipes/:id`  
**Example:** `GET /recipes/1`
**Response:**
```json
[
  {
    "id": 1,
    "title": "Spaghetti Carbonara",
    "image": "https://assets.unileversolutions.com/recipes-v2/109396.jpg",
    "instructions": "Boil pasta, cook pancetta, mix with eggs, cheese, and pepper.",
    "categories": "Italian, Pasta",
    "cost": 12.99
  }
]

**3. Create a new recipe**
**Endpoint:** POST `https://recipe-management-app-q93w.onrender.com/recipes`
**Request Body:**
```json
[
    {
    "id": 14,
    "title": "BBQ Ribs",
    "image": "https://grillinwithdad.com/wp-content/uploads/2024/04/ribs-featured-500x500.jpg",
    "instructions": "Slow-cook ribs, glaze with BBQ sauce, and grill.",
    "categories": "American, Grilled",
    "cost": 18.99
    }
]

**Response**
```json
{
  "message": "Recipe added successfully!",
  "recipeId": 5
}

### **Installation & Setup**
**1. Clone the Repository**
``
git clone https://github.com/Sravanikonapalli/recipe-management-app
cd recipe-management-app
``

**2. Setup Frontend**
``
cd frontend
npm install
npm start
``
**3. setup backend**
``
cd backend
npm install
node server.js
``
**4. setup Database**
``
cd backend
sqlite3 database.db
``
*to check stored recipes*
``
select * from recipes;
``
*to check stored recipe_details*
``
select * from recipe_details;
``

### **LIVE DEMO**
**backend**
[Get All Recipes] (https://recipe-management-app-q93w.onrender.com/recipes)
[get unique recipe] (https://recipe-management-app-q93w.onrender.com/recipes/:id)
**NOTE** *replace :id with specific number (e.g.,1,2,5,...)*

**frontend**
[Live Frontend] (https://recipe-management-app-t8oa.vercel.app/)

