import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import allRecipes from "../data/All_recipes.json";
import NavigationBar from "../navigation/NavigationBar";

export default function SavedRecipes() {
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Always sync with localStorage when page loads or storage changes
  useEffect(() => {
    const update = () => {
      const stored = JSON.parse(localStorage.getItem("savedRecipeIds")) || [];
      setSavedRecipeIds(stored);
    };

    window.addEventListener("storage", update);
    update();

    return () => window.removeEventListener("storage", update);
  }, []);

  useEffect(() => {
    const filtered = allRecipes.filter((r) => savedRecipeIds.includes(r.id));
    setSavedRecipes(filtered);
  }, [savedRecipeIds]);

  const handleUnsave = (recipeId) => {
    const updated = savedRecipeIds.filter((id) => id !== recipeId);
    setSavedRecipeIds(updated);
    localStorage.setItem("savedRecipeIds", JSON.stringify(updated));
  };

  return (
    <div>
      <NavigationBar />

      <div style={{ paddingTop: "90px" }}>
        <h1 style={{ textAlign: "center" }}>Saved Recipes</h1>

        {savedRecipes.length === 0 ? (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            You have no saved recipes!
          </h2>
        ) : (
          <Container>
            <Row>
              {savedRecipes.map((recipe) => (
                <Col key={recipe.id} xs={12} md={6} lg={4} xl={3}>
                  <FoodCard
                    {...recipe}
                    saved={true}
                    onUnsave={handleUnsave}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}
