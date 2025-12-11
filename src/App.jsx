import './App.css';
import { HashRouter, Route, Routes } from "react-router";     
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import ExploreRecipes from './pages/ExploreRecipes';
import SavedRecipes from './pages/SavedRecipes';
import RandomRecipe from "./pages/RandomRecipe";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/explore-recipes" element={<ExploreRecipes />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/random-recipe" element={<RandomRecipe />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
