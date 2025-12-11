import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import NavigationBar from "../navigation/NavigationBar";
import FoodCard from "../components/FoodCard";
import allRecipes from "../data/All_recipes.json";

export default function ExploreRecipes() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [sortOption, setSortOption] = useState("");

  const [savedRecipeIds, setSavedRecipeIds] = useState(() => {
    return JSON.parse(localStorage.getItem("savedRecipeIds")) || [];
  });

  const [resetCards, setResetCards] = useState(0);

  // Sync localStorage changes from SavedRecipes page
  useEffect(() => {
    const update = () => {
      const stored = JSON.parse(localStorage.getItem("savedRecipeIds")) || [];
      setSavedRecipeIds(stored);
    };

    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !ingredientsList.includes(trimmed)) {
      setIngredientsList([...ingredientsList, trimmed]);
    }
    setIngredientInput("");
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredientsList(ingredientsList.filter((i) => i !== ingredient));
  };

  const handleClearIngredients = () => {
    setIngredientsList([]);
  };

  // Save / Unsave + push to localStorage
  const toggleSave = (recipeId) => {
    let updated;
    if (savedRecipeIds.includes(recipeId)) {
      updated = savedRecipeIds.filter((id) => id !== recipeId);
    } else {
      updated = [...savedRecipeIds, recipeId];
    }

    setSavedRecipeIds(updated);
    localStorage.setItem("savedRecipeIds", JSON.stringify(updated));
  };

  const sortRecipes = (recipes) => {
    switch (sortOption) {
      case "name-asc":
        return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...recipes].sort((a, b) => b.name.localeCompare(a.name));
      case "calories-asc":
        return [...recipes].sort(
          (a, b) => a.nutrition.calories - b.nutrition.calories
        );
      case "calories-desc":
        return [...recipes].sort(
          (a, b) => b.nutrition.calories - a.nutrition.calories
        );
      case "protein-asc":
        return [...recipes].sort(
          (a, b) => a.nutrition.protein_g - b.nutrition.protein_g
        );
      case "protein-desc":
        return [...recipes].sort(
          (a, b) => b.nutrition.protein_g - a.nutrition.protein_g
        );
      default:
        return recipes;
    }
  };

  useEffect(() => {
    let filtered = allRecipes;

    if (ingredientsList.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map((i) => i.toLowerCase());
        return ingredientsList.every((term) =>
          recipeIngredients.some((i) => i.includes(term))
        );
      });
    }

    filtered = sortRecipes(filtered);

    // 🔥 KEY FIX:
    // Remove saved recipes from Explore page
    filtered = filtered.filter((r) => !savedRecipeIds.includes(r.id));

    setFilteredRecipes(filtered);
    setResetCards((prev) => prev + 1);
  }, [ingredientsList, sortOption, savedRecipeIds]);

  return (
    <div>
      <NavigationBar />
      <div style={{ paddingTop: "90px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Explore Recipes</h1>

        {/* Filters */}
        <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
          <Form.Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Form.Label>
              <strong>Filter by Ingredients</strong>
            </Form.Label>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Enter ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddIngredient();
                  }
                }}
                style={{ width: "250px" }}
              />
              <Button variant="secondary" onClick={handleAddIngredient}>
                Add
              </Button>

              {ingredientsList.length > 0 && (
                <Button variant="outline-danger" onClick={handleClearIngredients}>
                  Clear ingredients
                </Button>
              )}
            </div>

            {/* Ingredient badges */}
            <div style={{ marginTop: "10px" }}>
              {ingredientsList.map((ingredient) => (
                <Badge
                  key={ingredient}
                  bg="info"
                  text="dark"
                  style={{
                    marginRight: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "8px",
                  }}
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  {ingredient} ×
                </Badge>
              ))}
            </div>

            {/* Sorting */}
            <Form.Group style={{ marginTop: "20px", width: "250px" }}>
              <Form.Label>
                <strong>Sort Recipes</strong>
              </Form.Label>
              <Form.Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">None</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="calories-asc">Calories (Low → High)</option>
                <option value="calories-desc">Calories (High → Low)</option>
                <option value="protein-asc">Protein (Low → High)</option>
                <option value="protein-desc">Protein (High → Low)</option>
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Form>

        {/* Recipe Cards */}
        <Container fluid>
          <Row className="justify-content-center">
            {filteredRecipes.map((recipe) => (
              <Col key={`${recipe.id}-${resetCards}`} xs={12} md={6} lg={4} xl={3}>
                <FoodCard
                  {...recipe}
                  saved={false} // ensure Explore only shows unsaved
                  toggleSave={toggleSave}
                />
              </Col>
            ))}
          </Row>

          {filteredRecipes.length === 0 && (
            <h3
              style={{
                marginTop: "30px",
                color: "gray",
                textAlign: "center",
              }}
            >
              No matching recipes.
            </h3>
          )}
        </Container>
      </div>
    </div>
  );
}
