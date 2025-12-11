import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router";

export default function NavigationBar() {
  const linkStyle = {
    color: "#ddd",        
    padding: "0.5rem 1rem",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem"
  };

  const activeLinkStyle = {
    color: "#fff",        
    textDecoration: "underline",
    fontWeight: "700"
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top" style={{ padding: "0.5rem 1rem" }}>
      <Nav className="w-100 justify-content-center" style={{ gap: "2rem" }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Home
        </NavLink>
    
        <NavLink
          to="/explore-recipes"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Explore Recipes
        </NavLink>

        <NavLink
          to="/saved-recipes"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Saved Recipes
        </NavLink>

        <NavLink
          to="/random-recipe"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Random Recipe
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          About Page
        </NavLink>
      </Nav>
    </Navbar>
  );
}
