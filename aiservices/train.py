import joblib

def train_models(ticker, start_date, end_date):
    """
    Train LSTM and XGBoost models for the given ticker.
    """
    # Load and preprocess data
    stock_data = load_stock_data(ticker, start_date, end_date)
    stock_data = preprocess_data(stock_data)
    X, y = prepare_data_for_training(stock_data)
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
    # Train models
    lstm_model = train_lstm_model(X_train, y_train)
    xgb_model = train_xgboost_model(X_train, y_train)
    # Save models
    joblib.dump(lstm_model, 'lstm_model.pkl')
    joblib.dump(xgb_model, 'xgb_model.pkl')
    return lstm_model, xgb_model
#     return lstm_model, xgb_model