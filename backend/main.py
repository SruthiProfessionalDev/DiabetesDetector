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

from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

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
