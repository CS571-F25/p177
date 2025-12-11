import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FoodCard from "../components/FoodCard";
import allRecipes from "../data/All_recipes.json";
import NavigationBar from "../navigation/NavigationBar";

export default function SavedRecipes() {
  const [savedRecipeIds, setSavedRecipeIds] = useState(() => {
    return JSON.parse(localStorage.getItem("savedRecipeIds")) || [];
  });

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const filtered = allRecipes.filter(r => savedRecipeIds.includes(r.id));
    setSavedRecipes(filtered);
  }, [savedRecipeIds]);

  const handleUnsave = (recipeId) => {
    const updated = savedRecipeIds.filter(id => id !== recipeId);
    setSavedRecipeIds(updated);
    localStorage.setItem("savedRecipeIds", JSON.stringify(updated));
  };

  if (savedRecipes.length === 0) {
    return (
      <div>
        <NavigationBar />
        <h1 style={{ textAlign: "center", paddingTop: "90px" }}>
          You have no saved recipes!
        </h1>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <div style={{ paddingTop: "90px" }}>
        <h1>Saved Recipes</h1>
        <Container>
          <Row>
            {savedRecipes.map(recipe => (
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
      </div>
    </div>
  );
}
