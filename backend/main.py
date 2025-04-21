# # main.py
# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "FastAPI is running!"}

##############################
# from fastapi import FastAPI
# from predict import make_prediction
# from schema import PatientData

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Diabetes Prediction API is running."}

# @app.post("/predict")
# def predict(data: PatientData):
#     result = make_prediction(data)
#     return {"prediction": result}

import os
import joblib
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

endpoint = "https://models.github.ai/inference"
llm_model = "openai/gpt-4.1-mini"

# .env Configuration
load_dotenv()
token = os.environ["GITHUB_TOKEN"]

client = ChatCompletionsClient(
    endpoint = endpoint,
    credential = AzureKeyCredential(token),
)

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("diabetes_model.pkl")

# Define the request body schema
class DiabetesInput(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

@app.post("/predict")
def predict(input: DiabetesInput):
    data = [[
        input.Pregnancies,
        input.Glucose,
        input.BloodPressure,
        input.SkinThickness,
        input.Insulin,
        input.BMI,
        input.DiabetesPedigreeFunction,
        input.Age
    ]]
    prediction = model.predict(data)[0]
    result = "Diabetic" if prediction == 1 else "Not Diabetic"
    return {"prediction": result}

# Generate the meal plan

@app.post("/diet_suggestion")
def mealPlan(input: DiabetesInput):
    context = """
    You are a helpful AI assistant specializing in generating personalized and balanced 1-day meal plan suggestions for people recently diagnosed with diabetes,
    including Breakfast, Lunch, Dinner, and Snacks.
    Provide balanced meals suitable for blood sugar management.
    Always include a clear explanation for each meal choice, focusing on the benefits for blood sugar or diabetes management.
    **Output the entire response exclusively as a JSON object.** 
    Do not include any conversational text, introductions, or conclusions outside the JSON.
    """

    input_message = f"""
    Based on the following health data:
    - Pregnancies: {input.Pregnancies}
    - Glucose: {input.Glucose}
    - Blood Pressure: {input.BloodPressure}
    - Skin Thickness: {input.SkinThickness}
    - Insulin: {input.Insulin}
    - BMI: {input.BMI}
    - Diabetes Pedigree Function: {input.DiabetesPedigreeFunction}
    - Age: {input.Age} years

    This person has recently been diagnosed with diabetes.
    Generate a personalized 1-day meal plan including breakfast, lunch, dinner, and snacks, in JSON format.
    Keep it easy to prepare, balanced, and suitable for someone with these metrics and recent diabetes diagnosis.

    Example JSON Structure:
    {{
    "meal_plan": {{
        "breakfast": {{
        "meal": "Scrambled eggs with spinach + 1 slice whole grain toast + 1/2 avocado + black coffee.",
        "explanation": "Eggs and avocado provide healthy fats and protein, keeping blood sugar stable. Whole grain toast offers slow-digesting carbs. Spinach adds fiber and magnesium, which can improve insulin sensitivity."
        }},
        "lunch": {{
        "meal": "Grilled chicken salad with leafy greens, cucumbers, tomatoes, olive oil, and vinegar dressing.",
        "explanation": "High protein, low glycemic index meal. Olive oil helps reduce inflammation. Salad is low-calorie and high in fiber, helpful for BMI control."
        }},
        "snack": {{
        "meal": "A handful of almonds + 1 small apple.",
        "explanation": "Healthy fats and protein from almonds slow the sugar spike from the apple. Low-calorie but satisfying."
        }},
        "dinner": {{
        "meal": "Baked salmon, steamed broccoli, and quinoa.",
        "explanation": "Salmon offers omega-3s for heart health (important in diabetes). Broccoli provides fiber and antioxidants. Quinoa is a good carb with protein and fiber."
        }}
    }}
    }}

    Ensure the entire output is a valid JSON object following this structure.
    """

    response = client.complete(
        messages = [
            SystemMessage(context),
            UserMessage(input_message),
        ],
        temperature = 1.0,
        top_p = 1.0,
        model = llm_model
    )

    # Return a JSON Format file
    # print(response.choices[0].message.content)

    return response.choices[0].message.content