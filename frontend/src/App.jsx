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

      <h1 className="diabetes-detector-heading">Diabetes Detector and Diet Suggestion</h1>

<p className="diabetes-detector-paragraph">
  The Diabetes Detector is an AI-powered tool that helps identify the likelihood of a person developing diabetes based on various health metrics, such as age, BMI, blood pressure, and family history. By analyzing these factors, the tool provides a prediction of whether a person is at risk of diabetes, which can help in early diagnosis and prevention.
</p>

<h2 className="diabetes-detector-instructions-heading">Instructions to Measure Your Health Metrics</h2>

<p className="diabetes-detector-instructions">
  To use the Diabetes Detector, please gather the following health data. If you do not have access to some of these tests, consult a healthcare professional for assistance.
</p>

{/* 1. Pregnancies Section */}
<h3 className="diabetes-detector-topic-heading">1. Pregnancies</h3>
<p className="diabetes-detector-topic-description">
  Record the number of times you have been pregnant. This is typically self-reported. Here's how to calculate:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Think back to all the pregnancies you’ve had in your lifetime.</li>
  <li><strong>Step 2:</strong> Count the total number of times you have been pregnant, regardless of whether the pregnancy resulted in a live birth or not.</li>
  <li><strong>Step 3:</strong> If you're unsure, consult your medical records or discuss with a healthcare provider for an accurate count.</li>
</ul>

{/* 2. Glucose Section */}
<h3 className="diabetes-detector-topic-heading">2. Glucose</h3>
<p className="diabetes-detector-topic-description">
  Fasting blood glucose is a key indicator for diabetes. Here's how to measure it:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Ensure you fast for 8-12 hours before the test to get accurate results.</li>
  <li><strong>Step 2:</strong> Use a glucometer to test your blood sugar levels. These devices are often available at pharmacies and come with instructions on how to use them.</li>
  <li><strong>Step 3:</strong> Follow the glucometer’s instructions for inserting the test strip and pricking your finger to get a blood sample.</li>
  <li><strong>Step 4:</strong> Record your blood sugar level. A fasting glucose level above 126 mg/dL may indicate a risk for diabetes.</li>
</ul>

{/* 3. Blood Pressure Section */}
<h3 className="diabetes-detector-topic-heading">3. Blood Pressure</h3>
<p className="diabetes-detector-topic-description">
  High blood pressure is a common risk factor for diabetes. Here’s how you can measure your blood pressure:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Purchase a digital blood pressure monitor or use one at a local pharmacy or healthcare facility.</li>
  <li><strong>Step 2:</strong> Follow the device’s instructions on how to wrap the cuff around your arm and position it correctly.</li>
  <li><strong>Step 3:</strong> Relax and sit still while the monitor measures your blood pressure. It will automatically give you both your systolic (top number) and diastolic (bottom number) readings.</li>
  <li><strong>Step 4:</strong> Record the values. Normal blood pressure is below 120/80 mmHg, while readings higher than this may indicate hypertension, which increases the risk of diabetes.</li>
</ul>

{/* 4. Skin Thickness Section */}
<h3 className="diabetes-detector-topic-heading">4. Skin Thickness (Triceps Fold)</h3>
<p className="diabetes-detector-topic-description">
  Skinfold thickness, particularly the triceps fold, is used to assess body fat. Here’s how to measure it:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Use a skinfold caliper to measure the thickness of the skinfold at the triceps. These calipers are available at sports and health equipment stores.</li>
  <li><strong>Step 2:</strong> Pinch the skin and underlying fat at the back of your upper arm and place the caliper on the skinfold.</li>
  <li><strong>Step 3:</strong> Release the caliper and take the measurement. Ensure you’re measuring at the same site each time for accuracy.</li>
  <li><strong>Step 4:</strong> If you’re unsure, you may need assistance or visit a healthcare professional for accurate measurement.</li>
</ul>

{/* 5. Insulin Section */}
<h3 className="diabetes-detector-topic-heading">5. Insulin</h3>
<p className="diabetes-detector-topic-description">
  Insulin levels are best measured through a blood test performed in a healthcare setting. Here’s what you need to know:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Visit a healthcare professional to request an insulin test (also known as an insulin fasting test).</li>
  <li><strong>Step 2:</strong> This test requires you to fast for 8-12 hours before the blood sample is taken.</li>
  <li><strong>Step 3:</strong> After the test, your healthcare provider will give you the results and help interpret the insulin levels in relation to your diabetes risk.</li>
</ul>

{/* 6. BMI Section */}
<h3 className="diabetes-detector-topic-heading">6. BMI (Body Mass Index)</h3>
<p className="diabetes-detector-topic-description">
  BMI is a useful indicator of body fat based on height and weight. To measure it:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Use a scale to measure your weight in kilograms (kg).</li>
  <li><strong>Step 2:</strong> Measure your height in meters (m) using a tape measure or height scale.</li>
  <li><strong>Step 3:</strong> Use the following formula: BMI = weight (kg) / height² (m).</li>
  <li><strong>Step 4:</strong> A BMI of 25-29.9 is considered overweight, and above 30 is considered obese, which may increase your risk for diabetes.</li>
</ul>

{/* 7. Diabetes Pedigree Function Section */}
<h3 className="diabetes-detector-topic-heading">7. Diabetes Pedigree Function</h3>
<p className="diabetes-detector-topic-description">
  This function calculates your genetic risk of diabetes based on family history. Here's how to assess it:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Record any family history of diabetes, especially in first-degree relatives (parents, siblings) who developed diabetes before age 50.</li>
  <li><strong>Step 2:</strong> You can use an online calculator or consult your healthcare provider to compute the Diabetes Pedigree Function score.</li>
</ul>

{/* 8. Age Section */}
<h3 className="diabetes-detector-topic-heading">8. Age</h3>
<p className="diabetes-detector-topic-description">
  Your age can increase the likelihood of developing diabetes. Simply record your age in years:
</p>
<ul className="diabetes-detector-topic-steps">
  <li><strong>Step 1:</strong> Look at your birth date to determine your current age.</li>
  <li><strong>Step 2:</strong> If you're over the age of 45, your risk of diabetes increases.</li>
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
