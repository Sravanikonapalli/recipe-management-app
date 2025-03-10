import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/recipeDetails.css'
import { FaArrowLeft } from "react-icons/fa";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Fetch the details of a specific recipe using async/await
  useEffect(() => {
    async function fetchRecipe() {
      const response = await fetch(`https://recipe-management-app-q93w.onrender.com/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container">
      <Link to="/" className="back-link"><FaArrowLeft size={20}/> Back to Recipes</Link>
      <h2 className="recipe-title">{recipe.title}</h2>
      {recipe.image && (
      <img className="recipe-image" src={recipe.image} alt={recipe.title} />
      )}
      <div className="recipe-details">
        <p><strong>Instructions:</strong> {recipe.instructions}</p>
        <p><strong>Categories:</strong> {recipe.categories}</p>
        <p><strong>Cost:</strong> ${recipe.cost}</p>
        {recipe.detailed_description && (
          <p className="recipe-section">
            <strong>Detailed Description:</strong> {recipe.detailed_description}
          </p>
        )}
        {recipe.cooking_tips && (
          <p className="recipe-section">
            <strong>Cooking Tips:</strong> {recipe.cooking_tips}
          </p>
        )}
        {recipe.history && (
          <p className="recipe-section">
            <strong>History:</strong> {recipe.history}
          </p>
        )}
      </div>
  </div>

  );
}

export default RecipeDetails;
