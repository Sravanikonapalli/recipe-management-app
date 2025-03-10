import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/recipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all recipes from backend
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('https://recipe-management-app-q93w.onrender.com/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // Pick a random recipe and navigate to its details page
  const handleSurpriseMe = () => {
    if (recipes.length > 0) {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      navigate(`/recipe/${randomRecipe.id}`);
    }
  };

  // Delete a recipe by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        const response = await fetch(`https://recipe-management-app-q93w.onrender.com/recipes/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setRecipes(recipes.filter(recipe => recipe.id !== id)); 
        } else {
          console.error("Failed to delete recipe");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  return (
    <div className="recipelist-container">
      <div className="button-group">
        <button onClick={handleSurpriseMe} disabled={loading}>
          Surprise Me
        </button>
        <button onClick={() => navigate('/add-recipe')}>Add New Recipe</button>
      </div>

      {loading ? (
        <p className="loading-message">Loading recipes...</p>
      ) : (
        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3>{recipe.title}</h3>
                {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                <p><strong>Categories:</strong> {recipe.categories}</p>
                <p className="instructions"><strong>Instructions:</strong> {recipe.instructions}</p>
                <p><strong>Cost:</strong> ${recipe.cost}</p>
                <Link to={`/recipe/${recipe.id}`}>
                  <button>View Details</button>
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(recipe.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
