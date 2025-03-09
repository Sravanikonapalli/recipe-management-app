# Recipe Management Application
## Overview
This project is a full-stack Recipe Management Application built using the MERN stack (MongoDB or SQLite, Express.js, React, Node.js). It allows users to add, view, organize recipes with a drag-and-drop functionality.

## tech stack
**frontend:** React JS
**backend:** NodeJs, express js
**Databse:** SQLITE

## API endpoints
1.GET /recipes -> GEt all the recipes
2. POST /recipes -> create new recipe
3. GET /recipes/:id -> get each recipe
4. PUT /recipes/:id -> update new recipe

## deployment
**backend** render
**frontend** vercel

## installation and setup
1. git clone https://github.com/Sravanikonapalli/recipe-management-app
2. cd recipe-management-app
3. **frontend**
npm intsall
npm start
4. **backend**
node server.js
5. **database**
cd backend
sqlite3 database.db

*to see recipes table*
``sh
select * from recipes;
``
