import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing

def train_lstm_model(data, target_column='Close'):
    """
    Train a Holt-Winters Exponential Smoothing model.
    """
    # Ensure data is a Pandas Series
    if not isinstance(data[target_column], pd.Series):
        raise ValueError("Data must be a Pandas Series")
    
    model = ExponentialSmoothing(data[target_column], trend='add', seasonal=None)
    fitted_model = model.fit()
    return fitted_model

def predict_lstm(model, steps=1):
    """
    Predict future values using the trained Holt-Winters model.
    """
    forecast = model.forecast(steps)
    return forecast.values[0]