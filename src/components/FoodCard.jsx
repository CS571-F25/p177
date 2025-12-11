import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import japanFlag from "../pictures/japan_flag.jpg";
import italyFlag from "../pictures/italy_flag.jpg";
import franceFlag from "../pictures/france_flag.jpg";
import usFlag from "../pictures/united_states_flag.jpg";
import mexicoFlag from "../pictures/mexico_flag.jpg";
import chinaFlag from "../pictures/china_flag.jpg";

const labelMap = {
  calories: "Calories",
  protein_g: "Protein (g)",
  fat_g: "Fat (g)",
  carbs_g: "Carbs (g)",
  sodium_mg: "Sodium (mg)",
  fiber_g: "Fiber (g)",
  sugar_g: "Sugar (g)",
};

const countryFlags = {
  Japan: japanFlag,
  Italy: italyFlag,
  France: franceFlag,
  China: chinaFlag,
  Mexico: mexicoFlag,
  "United States": usFlag,
};

export default function FoodCard(props) {
  const [showDetails, setShowDetails] = useState(false);

  const {
    id,
    name,
    country,
    nutrition,
    ingredients,
    directions,
    saved,
    toggleSave,
    onUnsave,
  } = props;

  const flagSrc = countryFlags[country] || japanFlag;

  return (
    <Card className="p-3 m-2 shadow-sm" style={{ width: "100%", minWidth: "250px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img
          src={flagSrc}
          alt={`${country} flag`}
          style={{ width: "35px", height: "22px", borderRadius: "3px", objectFit: "cover" }}
        />

        {/* Save button (Explore page) */}
        {toggleSave && (
          <Button
            variant={saved ? "success" : "outline-success"}
            size="sm"
            onClick={() => toggleSave(id)}
          >
            {saved ? "Saved" : "Save"}
          </Button>
        )}
      </div>

      <Card.Title
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {name}
      </Card.Title>

      <Button
        variant="primary"
        onClick={() => setShowDetails((prev) => !prev)}
        className="mb-2"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </Button>

      {/* Remove button (Saved page) */}
      {onUnsave && (
        <Button
          variant="danger"
          style={{ width: "100%", marginBottom: "10px" }}
          onClick={() => onUnsave(id)}
        >
          Remove
        </Button>
      )}

      {/* Expanded Details */}
      {showDetails && (
        <div style={{ marginTop: "10px" }}>
          <h3>Nutrition</h3>
          <ul>
            {Object.entries(nutrition).map(([key, value]) => (
              <li key={key}>
                <strong>{labelMap[key]}:</strong> {value}
              </li>
            ))}
          </ul>

          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Directions</h3>
          <ol>
            {directions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </Card>
  );
}
