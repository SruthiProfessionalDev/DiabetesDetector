# Diabetes Prediction Web App

This is a web application built to predict whether a person is diabetic based on data from a CSV file. The backend is built with FastAPI, and the frontend allows users to upload their data, which is then processed and predicted using a machine learning model.

## Features

- Form to enter numeric data
- Get a prediction whether the person is diabetic or not.
- ReactJs for the frontend.

## Prerequisites

To run this project, you need the following:

- Python 3.7 or higher
- `pip` for installing dependencies

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/diabetes-prediction.git
cd diabetes-prediction
```

# Diabetes Prediction Web App

This is a web application built to predict whether a person is diabetic based on data from a CSV file. The backend is built with FastAPI, and the frontend allows users to upload their data, which is then processed and predicted using a machine learning model.

## Features

- Upload a CSV file with diabetes-related data.
- Get a prediction whether the person is diabetic or not.
- Built using FastAPI for the backend and HTML/JS for the frontend.

## Prerequisites

To run this project, you need the following:

- Python 3.7 or higher
- `pip` for installing dependencies

## Installation

### Backend Setup

1. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

2. Activate the virtual environment:

    - On Windows:
      ```bash
      .\venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:

    ```bash
    uvicorn main:app --reload
    ```

    The server will start on `http://localhost:8000`.

### Frontend Setup

1. Open the `index.html` file in your browser.
2. Use the file upload form to upload a CSV file containing the diabetes-related data.
3. The prediction will be displayed on the web page.

## API Documentation

The backend exposes the following API endpoint:

### POST /predict

- **Request**: Upload a CSV file containing the diabetes-related data.
- **Response**: A JSON object containing the prediction (either "Diabetic" or "Non-Diabetic").

#### Example Request:
```bash
POST http://localhost:8000/predict
```

- Content-Type: `multipart/form-data`
- Body: CSV file

#### Example Response:
```json
{
  "prediction": "Diabetic"
}
```

## Sample CSV Format

The CSV file should have the following columns for each record:

- `Pregnancies`
- `Glucose`
- `BloodPressure`
- `SkinThickness`
- `Insulin`
- `BMI`
- `DiabetesPedigreeFunction`
- `Age`

### Example:

```csv
Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age
6,148,72,35,0,33.6,0.627,50
1,85,66,29,0,26.6,0.351,31
8,183,64,0,0,23.3,0.672,32
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- FastAPI: Web framework for building APIs with Python.
- scikit-learn: For machine learning algorithms.
- Pandas: For data manipulation.
