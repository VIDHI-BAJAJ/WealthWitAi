import yfinance as yf
import pandas as pd


def load_stock_data(ticker, start=None, end=None):
    stock_data = yf.download(ticker, start=start, end=end)

    # Print columns before processing
    print("Columns in DataFrame after download:", stock_data.columns)

    # Expected column names
    expected_columns = ["Open", "High", "Low", "Close", "Adj Close", "Volume"]
    
    # If columns are numeric, rename them
    if not all(isinstance(col, str) for col in stock_data.columns):
        print("Warning: Column names are incorrect. Attempting to fix...")
        stock_data.columns = expected_columns[:len(stock_data.columns)]

    print("Final Columns in DataFrame:", stock_data.columns)

    if 'Close' not in stock_data.columns:
        raise ValueError("Missing 'Close' column after processing!")

    return stock_data


def save_raw_data(data, filepath):
    """
    Save raw stock data to CSV.
    """
    data.to_csv(filepath, index=True)  # Save the index (dates)

def load_raw_data(filepath):
    """
    Load raw stock data from CSV.
    """
    return pd.read_csv(filepath, parse_dates=True, index_col='Date')  # Parse dates and set as index