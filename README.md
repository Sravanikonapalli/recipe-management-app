#  Recipe Management Application

##  Overview
This project is a **full-stack Recipe Management Application** built using **React, Node.js, Express, and SQLite**.  
It allows users to **add, view, organize, and manage recipes** efficiently.

---

##  Tech Stack
- **Frontend:** React.js 
- **Backend:** Node.js + Express.js 
- **Database:** SQLite 

---

##  Features
 **Add new recipes** with **title, image, instructions, description, categories, and cost**  
 **View a list** of all available recipes  
 **Delete existing recipes**  

---

##  API Endpoints

### **1 Get All Recipes**
**Endpoint:**  
```http
GET https://recipe-management-app-q93w.onrender.com/recipes
```
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
```

---

### **2 Get Single Recipe**
**Endpoint:**  
```http
GET https://recipe-management-app-q93w.onrender.com/recipes/:id
```
**Example:**  
```http
GET /recipes/1
```
**Response:**
```json
{
  "id": 1,
  "title": "Spaghetti Carbonara",
  "image": "https://assets.unileversolutions.com/recipes-v2/109396.jpg",
  "instructions": "Boil pasta, cook pancetta, mix with eggs, cheese, and pepper.",
  "categories": "Italian, Pasta",
  "cost": 12.99
}
```

---

### **3 Create a New Recipe**
**Endpoint:**  
```http
POST https://recipe-management-app-q93w.onrender.com/recipes
```
**Request Body:**
```json
{
  "title": "BBQ Ribs",
  "image": "https://grillinwithdad.com/wp-content/uploads/2024/04/ribs-featured-500x500.jpg",
  "instructions": "Slow-cook ribs, glaze with BBQ sauce, and grill.",
  "categories": "American, Grilled",
  "cost": 18.99
}
```
**Response:**
```json
{
  "message": "Recipe added successfully!",
  "recipeId": 5
}
```

---

## 🚀 Installation & Setup

### **1 Clone the Repository**
```sh
git clone https://github.com/Sravanikonapalli/recipe-management-app
cd recipe-management-app
```

### **2 Setup Frontend**
```sh
cd frontend
npm install
npm start
```

### **3 Setup Backend**
```sh
cd backend
npm install
node server.js
```

### **4 Setup Database**
```sh
cd backend
sqlite3 database.db
```
**To check stored recipes:**
```sql
SELECT * FROM recipes;
```
**To check stored recipe details:**
```sql
SELECT * FROM recipe_details;
```

---

##  Live Demo

### ** Backend**
- [Get All Recipes](https://recipe-management-app-q93w.onrender.com/recipes)  
- [Get Single Recipe](https://recipe-management-app-q93w.onrender.com/recipes/:id)  
  **Note:** Replace `:id` with a specific number (e.g., `1`, `2`, `5`, etc.).

### ** Frontend**
- [Live Frontend](https://recipe-management-app-t8oa.vercel.app/)

---

