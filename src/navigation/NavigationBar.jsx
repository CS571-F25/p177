import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Nav className="w-100 justify-content-evenly">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About Page</Nav.Link>
        <Nav.Link as={Link} to="/explore-recipes">Explore Recipes</Nav.Link>
      </Nav>
    </Navbar>
  );
}
