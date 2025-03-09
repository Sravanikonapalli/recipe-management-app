import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/recipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch all recipes from backend using async/await
  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch('https://recipe-management-app-q93w.onrender.com/recipes');
      const data = await response.json();
      setRecipes(data);
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

  return (
    <div className="recipelist-container">
      <div className="button-group">
        <button onClick={handleSurpriseMe}>Surprise Me</button>
        <button onClick={() => navigate('/add-recipe')}>Add New Recipe</button>
      </div>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            {recipe.image && (
              <img src={recipe.image} alt={recipe.title} />
            )}
            <p>
              <strong>Categories:</strong> {recipe.categories}
            </p>
            <p className="instructions">
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p>
              <strong>Cost:</strong> ${recipe.cost}
            </p>
            <Link to={`/recipe/${recipe.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
