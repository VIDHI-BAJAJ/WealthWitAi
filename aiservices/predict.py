from flask import Flask, request, jsonify
import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from preprocessing.data_loader import load_stock_data
from preprocessing.feature_engineering import preprocess_data, prepare_data_for_training
from models.lstm_model import train_holt_winters_model as train_lstm_model, predict_holt_winters as predict_lstm
from models.xgboost_model import train_xgboost_model, predict_xgboost
from models.hybrid_model import combine_predictions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Step 1: Parse input JSON
        data = request.json
        ticker = data.get("ticker", None)
        if not ticker:
            return jsonify({"message": "Ticker is required."}), 400

        print(f"Received ticker: {ticker}")  # Log the received ticker

        # Step 2: Fetch historical stock data
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        stock_data = load_stock_data(ticker, start_date, end_date)

        if stock_data.empty:
            return jsonify({"message": "No data available for the given ticker"}), 400

        print(f"Fetched data for {ticker}: {stock_data}")  # Log the fetched data

        # Step 3: Add technical indicators
        stock_data = preprocess_data(stock_data)

        # Step 4: Prepare data for training
        X, y = prepare_data_for_training(stock_data)

        # Ensure X and y are Pandas objects
        X = pd.DataFrame(X)
        y = pd.Series(y)

        # Check shapes of X and y
        print(f"Shape of X: {X.shape}")
        print(f"Shape of y: {y.shape}")

        # Step 5: Split data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

        # Reset indices to ensure alignment
        X_train = X_train.reset_index(drop=True)
        X_test = X_test.reset_index(drop=True)

        # Ensure X_test is a DataFrame with correct column names
        X_test = pd.DataFrame(X_test, columns=X_train.columns)

        # Ensure y_train and y_test are 1D arrays
        y_train = pd.Series(y_train).reset_index(drop=True)
        y_test = pd.Series(y_test).reset_index(drop=True)
        y_train = y_train.to_numpy().ravel()
        y_test = y_test.to_numpy().ravel()

        # Debugging Logs
        print("Columns of X_train:", X_train.columns)
        print("Columns of X_test:", X_test.columns)
        print("Shape of X_train:", X_train.shape)
        print("Shape of X_test:", X_test.shape)
        print("Shape of y_train:", y_train.shape)
        print("Shape of y_test:", y_test.shape)

        # Step 6: Train models
        lstm_model = train_lstm_model(X_train, y_train)
        xgb_model = train_xgboost_model(X_train, y_train)

        # Step 7: Predictions
        lstm_prediction = predict_lstm(lstm_model, X_test)
        xgb_prediction = predict_xgboost(xgb_model, X_test)

        combined_prediction = combine_predictions(lstm_prediction, xgb_prediction)
        print(f"Combined Prediction: {combined_prediction}")  # Log the prediction

        # Step 8: Return results
        return jsonify({
            "ticker": ticker,
            "lstm_prediction": lstm_prediction,
            "xgb_prediction": xgb_prediction,
            "combined_prediction": combined_prediction
        })

    except Exception as e:
        print("Error during prediction:", str(e))  # Log the error
        return jsonify({"error": "An error occurred during prediction"}), 500

if __name__ == '__main__':
    app.run(debug=True)