import xgboost as xgb
from sklearn.metrics import mean_squared_error


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
    """
    Predict using the trained XGBoost model.
    """
    # Ensure X_test is a DataFrame
    if not isinstance(X_test, pd.DataFrame):
        X_test = pd.DataFrame(X_test, columns=model.get_booster().feature_names)

    predictions = model.predict(X_test)
    return predictions[0] if len(predictions) == 1 else predictions
def evaluate_xgboost_model(model, X_test, y_test):
    """
    Evaluate the XGBoost model.
    """
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    return mse