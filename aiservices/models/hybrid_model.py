import numpy as np
def combine_predictions(lstm_prediction, xgb_prediction):
    """
    Combine predictions from LSTM and XGBoost models.
    """
    # Convert predictions to scalar values if they are arrays
    lstm_scalar = np.mean(lstm_prediction) if isinstance(lstm_prediction, np.ndarray) else lstm_prediction
    xgb_scalar = np.mean(xgb_prediction) if isinstance(xgb_prediction, np.ndarray) else xgb_prediction

    # Combine predictions (e.g., simple average)
    combined_prediction = (lstm_scalar + xgb_scalar) / 2
    return combined_prediction