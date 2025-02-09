from sklearn.metrics import mean_squared_error, r2_score
def evaluate_model(y_true, y_pred):
    mse = mean_squared_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    print(f"MSE: {mse}, R2: {r2}")  # Log metrics
    return mse, r2
# def evaluate_model(y_true, y_pred):
#     mse = mean_squared_error(y_true, y_pred)
#     r2 = r2_score(y_true, y_pred)
#     return mse, r2