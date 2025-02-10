import xgboost as xgb
from sklearn.metrics import mean_squared_error
import pandas as pd

def train_xgboost_model(X_train, y_train):
    """
    Train an XGBoost model.
    """
    # Ensure y_train is 1D
    y_train = y_train.ravel()

    model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100)
    model.fit(X_train, y_train)
    return model
def predict_xgboost(model, X_test):
    # Ensure X_test is a DataFrame with correct column names
    if not isinstance(X_test, pd.DataFrame):
        raise ValueError("X_test must be a Pandas DataFrame")
    
    # Debugging Logs
    print("Type of X_test in predict_xgboost:", type(X_test))
    print("Columns of X_test in predict_xgboost:", X_test.columns)
    print("Shape of X_test in predict_xgboost:", X_test.shape)
    print("Sample of X_test in predict_xgboost:\n", X_test.head())
    
    # Make predictions
    predictions = model.predict(X_test)
    return predictions
def evaluate_xgboost_model(model, X_test, y_test):
    """
    Evaluate the XGBoost model.
    """
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    return mse