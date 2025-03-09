import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeSubmissionForm from "./components/RecipeSubmissionForm";

function App() {
    const [theme, setTheme] = useState('light'); 

    // Load theme from localStorage on initial render
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save theme to localStorage
    };

    return (
        <Router>
            <div className={`app-container ${theme}`}> 
                <header className="header">Recipe Management App</header>

                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/add-recipe">Add Recipe</Link>
                    <button className="theme-toggle-btn" onClick={toggleTheme}>
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </nav>

                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                    <Route path="/add-recipe" element={<RecipeSubmissionForm />} />
                </Routes>

                <footer className="footer">&copy; 2025 Recipe Management App</footer>
            </div>
        </Router>
    );
}

export default App;
