import pandas as pd
import numpy as np

def add_moving_averages(data, windows=[5, 10, 20]):
    """
    Add moving averages to the dataset.
    """
    for window in windows:
        data[f'SMA_{window}'] = data['Close'].rolling(window=window).mean()
    return data

def add_rsi(data, window=14):
    """
    Add Relative Strength Index (RSI) to the dataset.
    """
    delta = data['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / (loss + 1e-10)  # Avoid division by zero
    data['RSI'] = 100 - (100 / (1 + rs))
    return data
def preprocess_data(data):
    """
    Preprocess the stock data by adding technical indicators.
    """
    # Add moving averages
    data = add_moving_averages(data, windows=[5, 10, 20])
    
    # Add RSI
    data = add_rsi(data)
    
    # Drop rows with missing values
    data.dropna(inplace=True)
    
    return data

def prepare_data_for_training(data):
    """
    Prepare the dataset for training by splitting into X (features) and y (target).
    """
    # Features: Use technical indicators
    X = data[['SMA_5', 'SMA_10', 'SMA_20', 'RSI']].copy()

    # Target: Use the next day's closing price
    y = data['Close'].shift(-1)

    # Align X and y (remove rows with NaN values)
    X = X.iloc[:-1]  # Remove the last row (no target value for it)
    y = y.iloc[:-1]  # Remove the last row (no target value for it)

    # Reset indices to ensure alignment
    X = X.reset_index(drop=True)
    y = y.reset_index(drop=True)

    # Ensure y is a 1D array
    y = y.to_numpy().ravel()  # Convert to 1D NumPy array

    return X, y