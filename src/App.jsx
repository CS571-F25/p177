import './App.css'
import {HashRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import AboutMe from "./pages/AboutMe"
import ExploreRecipes from './pages/ExploreRecipes'
function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<AboutMe/>}></Route>
      <Route path="/explore-recipes" element={<ExploreRecipes/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
