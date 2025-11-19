import { Card, Container, Button } from "react-bootstrap";
import { useState } from "react";

export default function FoodCard(props) {
    const [showDetails, setShowDetails] = useState(false);
    const labelMap = {
        calories: "Calories",
        protein_g: "Protein (g)",
        fat_g: "Fat (g)",
        carbs_g: "Carbs (g)",
        sodium_mg: "Sodium (mg)",
        fiber_g: "Fiber (g)",
        sugar_g: "Sugar (g)"
    };

    return (
        <Card style={{ margin: 10, padding: 10 }}>
            <Container>
                <h4><strong>{props.name}</strong></h4>

                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? "Hide Details" : "Show Details"}
                </Button>

                {showDetails && (
                    <>
                        <p className="mt-3"><strong>Directions</strong></p>
                        <ul>
                            {props.directions.map((direction, index) => (
                                <li key={index}>{direction}</li>
                            ))}
                        </ul>
                        <p><strong>Ingredients</strong></p>
                        <ul>
                            {props.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p><strong>Nutrition</strong></p>
                        <ul>
                            {Object.entries(props.nutrition).map(([key, value]) => (
                                <li key={key}>
                                <strong>{key.replace("_g", "").replace("_mg", "")}:</strong> {value}
                                {key.endsWith("_g") ? "g" : key.endsWith("_mg") ? "mg" : ""}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Container>
        </Card>
    );
}
