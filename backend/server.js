const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const path = require('path');
const Joi = require('joi');
const dbPath = path.join(__dirname, "database.db");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(`DATABASE ERROR: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//Retrieve all recipes from the database
app.get("/recipes", async (req, res) => {
  try {
    const fetchAllRecipes = `SELECT * FROM recipes;`;
    const recipes = await db.all(fetchAllRecipes);
    res.status(200).json(recipes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create a new recipe in the database
const recipeSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().uri().allow(''),
  instructions: Joi.string().required(),
  categories: Joi.string().required(),
  cost: Joi.number().required(),
});

app.post("/recipes", async (req, res) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { title, image, instructions, categories, cost } = req.body;
    const insertQuery = `
      INSERT INTO recipes (title, image, instructions, categories, cost)
      VALUES (?, ?, ?, ?, ?);
    `;
    const result = await db.run(insertQuery, [title, image, instructions, categories, cost]);
    res.status(201).json({ 
      message: "Recipe added successfully", 
      id: result.lastID 
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update an existing recipe identified by its ID
app.put("/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, image, instructions, categories, cost } = req.body;
        if (!title || !image || !instructions || !categories || cost === undefined) {
        return res.status(400).json({ error: "Please provide title, image, instructions, categories, and cost." });
      }
  
      const existingRecipe = await db.get("SELECT * FROM recipes WHERE id = ?", [id]);
      if (!existingRecipe) {
        return res.status(404).json({ error: "Recipe not found." });
      }
  
      const updateQuery = `
        UPDATE recipes
        SET title = ?, image = ?, instructions = ?, categories = ?, cost = ?
        WHERE id = ?
      `;
      await db.run(updateQuery, [title, image, instructions, categories, cost, id]);
  
      res.status(200).json({ message: "Recipe updated successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

//Retrieve a specific recipe along with its detailed information
app.get("/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const query = `
        SELECT r.*, rd.detailed_description, rd.cooking_tips, rd.history
        FROM recipes AS r
        LEFT JOIN recipe_details AS rd ON r.id = rd.recipe_id
        WHERE r.id = ?;
      `;
      const recipe = await db.get(query, [id]);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(recipe);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  //middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  })