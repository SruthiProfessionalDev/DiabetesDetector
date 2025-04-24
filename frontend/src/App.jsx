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
  const [diet, setDiet] = useState(""); // State for diet suggestion

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000", form);
      setResult(res.data.prediction);

      // Only fetch diet if person is diabetic
      if (res.data.prediction === "Diabetic") {
        const dietRes = await axios.post("http://127.0.0.1:8000/diet_suggestion", form);
        setDiet(dietRes.data);
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
    setDiet(""); // Reset diet suggestion
  };

  return (
    <div className="main-container">
      <div className="diabetes-detector-container">
      <h1 className="diabetes-detector-heading">Diabetes Detector</h1>
      <p className="diabetes-detector-paragraph">
        The Diabetes Detector is an AI-powered tool that helps identify the likelihood of a person developing diabetes based on various health metrics, such as age, BMI, blood pressure, and family history. By analyzing these factors, the tool provides a prediction of whether a person is at risk of diabetes, which can help in early diagnosis and prevention.
      </p>
      <h2 className="diabetes-detector-suggestion-heading">Suggestions</h2>
      <ul className="diabetes-detector-suggestions-list">
        <li>Maintain a healthy diet: Focus on eating more vegetables, whole grains, and lean proteins.</li>
        <li>Stay active: Regular physical activity, like walking or swimming, can help maintain a healthy weight.</li>
        <li>Monitor blood sugar levels: If you are at risk or have diabetes, regular check-ups are crucial for early intervention.</li>
        <li>Consult a healthcare professional: If you have any concerns about diabetes, seek medical advice for a personalized plan.</li>
      </ul>
      </div>
    <div className="container">
      
    
      <div className="suggestion-container">
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
      </div>

      <div className="prediction-container">
        {/* Show diet suggestion if available */}
      {diet && (
        <div className="diet-section">
          <h3>🍽️ Dietary Suggestion</h3>
          <pre>{diet}</pre>
        </div>
      )}
      </div>
    </div>
    </div>
  );
}

export default App;
