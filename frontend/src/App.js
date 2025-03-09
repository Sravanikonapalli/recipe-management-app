import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeSubmissionForm from "./components/RecipeSubmissionForm";
import RecipeOrganizer from "./components/RecipeOrganizer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">Recipe Management App</header>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/organizer">Drag and Drop</Link>
        </nav>

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<RecipeSubmissionForm />} />
          <Route path="/organizer" element={<RecipeOrganizer/>}/>
        </Routes>

        <footer className="footer">&copy; 2025 Recipe Management App</footer>
      </div>
    </Router>
  );
}

export default App;
