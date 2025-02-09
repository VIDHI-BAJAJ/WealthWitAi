# def combine_predictions(lstm_pred, xgb_pred):
def combine_predictions(lstm_pred, xgb_pred, weights=(0.5, 0.5)):
    """
    Combine predictions from LSTM and XGBoost using weighted averaging.
    """
    return weights[0] * lstm_pred + weights[1] * xgb_pred
   
    # return (lstm_pred + xgb_pred) / 2