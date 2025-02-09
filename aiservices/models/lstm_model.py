
from statsmodels.tsa.holtwinters import ExponentialSmoothing

def train_holt_winters_model(data, target_column='Close'):
    """
    Train a Holt-Winters Exponential Smoothing model.
    """
    model = ExponentialSmoothing(data[target_column], trend='add', seasonal=None)
    fitted_model = model.fit()
    return fitted_model

def predict_holt_winters(model, steps=1):
    """
    Predict future values using the trained Holt-Winters model.
    """
    forecast = model.forecast(steps)
    return forecast.values[0]

def train_lstm_model(data, target_column='Close'):
    """
    Train an LSTM-like model using Holt-Winters Exponential Smoothing.
    """
    model = ExponentialSmoothing(data[target_column], trend='add', seasonal=None)
    fitted_model = model.fit()
    return fitted_model
def predict_lstm(model, X_test):
    """
    Predict future values using the trained Holt-Winters model.
    """
    # Ensure X_test is a DataFrame with the correct column names
    X_test = pd.DataFrame(X_test, columns=['SMA_5', 'SMA_10', 'SMA_20', 'RSI'])

    # Predict using the model
    forecast = model.forecast(steps=len(X_test))
    return forecast.values[0]