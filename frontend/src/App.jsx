import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0,
    DiabetesPedigreeFunction: 0,
    Age: 0
  });

  const [result, setResult] = useState("");
  const [diet, setDiet] = useState(""); // 👉 ADD: State for diet suggestion

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", form);
      setResult(res.data.prediction);

      // 👉 ADD: Only fetch diet if person is diabetic
      if (res.data.prediction === "Positive for Diabetes") {
        const dietRes = await axios.post("http://127.0.0.1:8000/diet_suggestion", form);
        setDiet(dietRes.data.diet);
      } else {
        setDiet(""); // Clear old suggestions
      }
    } catch (err) {
      console.error(err);
      setResult("Error making prediction.");
      setDiet(""); // Reset diet too
    }
  };

  const handleReset = () => {
    setForm({
      Pregnancies: 0,
      Glucose: 0,
      BloodPressure: 0,
      SkinThickness: 0,
      Insulin: 0,
      BMI: 0,
      DiabetesPedigreeFunction: 0,
      Age: 0
    });
    setResult(""); 
    setDiet(""); // 👉 ADD: Reset diet suggestion
  };

  return (
    <div className="container">
      <h2>🩺 Diabetes Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="number"
              name={key}
              step="any"
              value={form[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="button-group">
          <button type="submit">Predict</button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset All
          </button>
        </div>
      </form>
      
      {result && (
        <p>
          <strong>Prediction:</strong> {result}
        </p>
      )}

      {/* 👉 ADD: Show diet suggestion if available */}
      {diet && (
        <div className="diet-section">
          <h3>🍽️ Dietary Suggestion</h3>
          <pre>{diet}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
