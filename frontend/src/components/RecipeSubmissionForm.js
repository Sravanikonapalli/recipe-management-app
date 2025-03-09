// src/components/RecipeSubmissionForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/recipeSubmisionForm.css';

const RecipeSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    instructions: '',
    categories: '',
    cost: '',
    detailed_description: '',
    cooking_tips: '',
    history: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (!formData.instructions) newErrors.instructions = 'Instructions are required';
    if (!formData.categories) newErrors.categories = 'Categories are required';
    if (!formData.cost) newErrors.cost = 'Cost is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const response = await fetch('https://recipe-management-app-q93w.onrender.com/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    navigate(`/recipe/${data.id}`);
  };

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      <h2 className="form-title">Add New Recipe</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="label-and-input">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="label-and-input">
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              className="input-field"
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <div className="label-and-input">
            <label>Instructions:</label>
            <textarea
              name="instructions"
              className="text-area"
              value={formData.instructions}
              onChange={handleChange}
              rows="5"
            />
            {errors.instructions && <span className="error">{errors.instructions}</span>}
          </div>

          <div className="label-and-input">
            <label>Categories:</label>
            <input
              type="text"
              name="categories"
              className="input-field"
              value={formData.categories}
              onChange={handleChange}
            />
            {errors.categories && <span className="error">{errors.categories}</span>}
          </div>

          <div className="label-and-input">
            <label>Cost:</label>
            <input
              type="number"
              step="0.01"
              name="cost"
              className="input-field"
              value={formData.cost}
              onChange={handleChange}
            />
            {errors.cost && <span className="error">{errors.cost}</span>}
          </div>

          <div className="label-and-input">
            <label>Detailed Description:</label>
            <textarea
              name="detailed_description"
              className="text-area"
              value={formData.detailed_description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="label-and-input">
            <label>Cooking Tips:</label>
            <textarea
              name="cooking_tips"
              className="text-area"
              value={formData.cooking_tips}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="label-and-input">
            <label>History:</label>
            <textarea
              name="history"
              className="text-area"
              value={formData.history}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <button type="submit" className="submit-btn">Submit Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeSubmissionForm;
