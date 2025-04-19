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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", form);
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      setResult("Error making prediction.");
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
    setResult(""); // Clear result as well
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
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">Predict</button>
          <button type="reset-button" onClick={handleReset} style={{ backgroundColor: "#ccc", color: "#000" }}>
            Reset All
          </button>
        </div>
      </form>
      {result && <p><strong>Prediction:</strong> {result}</p>}
    </div>
  );
}

export default App;
