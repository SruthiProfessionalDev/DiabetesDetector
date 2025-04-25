# Diabetes Detector

This project predicts the likelihood of a person developing diabetes based on medical data such as age, BMI, glucose levels, etc. The goal of this project is to help individuals assess their risk of diabetes using a machine learning model.

The model is trained on historical medical data and is accessible through a simple web application where users can input their data and receive a prediction.

## Features

- **Machine Learning Model**: Predicts diabetes risk using historical medical data.
- **User Interface**: Simple web app where users can input their medical data.
- **Data Preprocessing**: The data is cleaned, processed, and used to train the model.
- **Model Evaluation**: The model's performance is evaluated using metrics like accuracy, precision, and recall.
- **Meal Suggestion**: A 1-day meal plan is suggested using historical medical data.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Python (Flask), Scikit-learn for machine learning
- **Machine Learning Libraries**: Scikit-learn, Pandas, NumPy
- **Version Control**: Git
- **Other Tools**: GitHub Action
## Installation

Follow these steps to run the project locally.

### Prerequisites

Ensure you have the following installed:
- Python 3.x
- Node.js and npm
- Git

# Dataset
The Dataset was taken from kaggle
https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database

## Starting up with the project

```bash
### Clone the Repository
git clone https://github.com/your-username/diabetes-detector.git
cd diabetes-detector

## Backend Setup

# Navigate to the backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload

# After setting up the backend, navigate to the frontend directory
cd frontend

# Install npm dependencies
npm install

# Run the frontend development server
npm run dev

```

## How It Works

### Input Data

The user is prompted to input the following data:

- **Age**
- **BMI (Body Mass Index)**
- **Glucose Level**
- **Blood Pressure**
- **Insulin Level**
- **Diabetes Pedigree Function**
- **Skin Thickness**
- **Pregnancies**

---

### Process

1. User inputs health data via the web app.
2. Data is sent to the backend API, where it's preprocessed.
3. A trained machine learning model (e.g., Random Forest) predicts diabetes risk.
4. The result is returned and displayed in the web app.

---

### Output

The prediction output will be:

- ✅ **Diabetic** – User is likely to have diabetes.
- ❌ **Not diabetic** – User is not likely to have diabetes.

---

### Model

The model is trained using a dataset like the **PIMA Indians Diabetes Dataset**, which contains real-world medical records.  
The chosen model is a **Random Forest Classifier**, known for high accuracy in classification tasks.

---

### Model Evaluation

The model performance is measured using:

- **Accuracy**
- **Precision**
- **Recall**
- **F1-Score**

These metrics help evaluate how well the model is predicting diabetes risk.

