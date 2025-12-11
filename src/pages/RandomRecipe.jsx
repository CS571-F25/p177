import { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import NavigationBar from "../navigation/NavigationBar";
import FoodCard from "../components/FoodCard";
import allRecipes from "../data/All_recipes.json";

export default function RandomRecipe() {
  const [recipe, setRecipe] = useState(null);

  const generateRandomRecipe = () => {
    const random = allRecipes[Math.floor(Math.random() * allRecipes.length)];
    setRecipe(random);
  };

  return (
    <div>
      <NavigationBar />

      <div style={{ paddingTop: "90px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "20px" }}>Random Recipe Generator</h1>

        <Button
          variant="success"
          onClick={generateRandomRecipe}
          style={{ marginBottom: "30px" }}
        >
          🎲 Get Random Recipe
        </Button>

        <Container>
          <Row>
            {recipe && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <FoodCard {...recipe} />
              </div>
            )}
          </Row>

          {!recipe && (
            <h4 style={{ color: "gray", marginTop: "20px" }}>
              Click the button to generate a random recipe!
            </h4>
          )}
        </Container>
      </div>
    </div>
  );
}
