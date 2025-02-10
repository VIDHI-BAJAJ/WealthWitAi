import React, { useState } from 'react';
import axios from 'axios';
import { Search } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Aiprediction = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState('');
  const [historicalData, setHistoricalData] = useState([]); // Historical stock prices
  const [currentValue, setCurrentValue] = useState(null); // Current stock value
  const [loading, setLoading] = useState(false); // Loading state

  // Popular stock symbols
  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX'];

  // Fetch historical stock data from Alpha Vantage
  const fetchHistoricalData = async (ticker) => {
    try {
      const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your Alpha Vantage API key
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}&outputsize=compact`;
      const response = await axios.get(url);
      const timeSeries = response.data['Time Series (Daily)'];
      if (!timeSeries) {
        throw new Error('No historical data available for the given ticker');
      }
      // Parse historical data
      const parsedData = Object.entries(timeSeries).map(([date, values]) => ({
        date: date,
        price: parseFloat(values['4. close']), // Closing price
      }));
      // Sort data by date (most recent first)
      parsedData.sort((a, b) => new Date(a.date) - new Date(b.date));
      setHistoricalData(parsedData);
    } catch (err) {
      console.error("Error fetching historical stock data:", err.message);
    }
  };

  // Fetch current stock value using your backend API
  const fetchCurrentValue = async (ticker) => {
    try {
      const response = await axios.get(`http://localhost:6005/api/stock/${ticker}`);
      console.log("Current Value API Response:", response.data); // Log the full response
  
      // Check if the response is an array
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Extract the latest closing price (most recent entry)
        const latestPrice = response.data[response.data.length - 1].close;
  
        // Validate the extracted value
        if (typeof latestPrice === "number" && !isNaN(latestPrice)) {
          setCurrentValue(latestPrice);
        } else {
          console.error("Invalid or missing close price in API response:", response.data);
          setCurrentValue(null); // Fallback to null if value is invalid
        }
      } else {
        console.error("Unexpected API response structure (not an array):", response.data);
        setCurrentValue(null); // Fallback to null if response is invalid
      }
    } catch (err) {
      console.error("Error fetching current stock value:", err.response?.data || err.message);
      setCurrentValue(null); // Fallback to null on error
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:6005/api/predict', { ticker: stockSymbol });
      console.log("Prediction API Response:", response.data); // Log the response
      setPredictionData(response.data);
    } catch (err) {
      console.error("Error fetching prediction data:", err.response?.data || err.message);
      setError('Please try again.');
    }

    // Fetch historical and current data regardless of prediction success
    try {
      await fetchHistoricalData(stockSymbol); // Fetch historical stock data
      await fetchCurrentValue(stockSymbol); // Fetch current stock value
    } catch (err) {
      console.error("Error fetching additional data:", err.response?.data || err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Line chart data
  const chartData = {
    labels: historicalData.map((data) => data.date), // Dates on x-axis
    datasets: [
      {
        label: 'Original Price',
        data: historicalData.map((data) => data.price.toFixed(2)), // Original prices
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Predicted Price',
        data: predictionData && historicalData.length > 0
          ? Array(historicalData.length - 1).fill(null).concat([predictionData?.combined_prediction?.toFixed(2)])
          : [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-BannerBlue h-48 w-full text-black">
        <div className="text-center text-3xl font-bold pt-10">
          <h1>AI Predictions</h1>
        </div>
        <p className="text-center mt-5 text-lg">AI-powered insights for smarter stock market predictions!</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-row items-center w-full max-w-lg mx-auto mt-24 relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter Stock Symbol"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
            className="p-2 w-full rounded-md text-black mb-4 mt-5 relative border-2 rounded-lg flex items-center bg-white pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search size={20} />
          </div>
        </div>
        <button
          type="submit"
          className="bg-BannerBlue text-black px-6 py-2 rounded-md ml-4"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Loading...' : 'Predict'}
        </button>
      </form>

      {/* Popular Stocks Section */}
      <div className="flex space-x-4 justify-center mt-6">
        {popularStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => setStockSymbol(stock)}
            className="bg-gray-300 text-black px-4 py-1 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            {stock}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Prediction Results */}
      {predictionData && !loading && (
        <div className="mt-10 w-full max-w-4xl mx-auto">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md text-black">
              <h2 className="text-xl font-bold">Stock Name</h2>
              <p className="mt-2">{predictionData.ticker}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md text-black">
              <h2 className="text-xl font-bold">Current Value</h2>
              <p className="mt-2">
                ₹{currentValue !== null && typeof currentValue === "number" ? currentValue.toFixed(2) : 'N/A'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md text-black">
              <h2 className="text-xl font-bold">AI Prediction</h2>
              <p className="mt-2">
                ₹{predictionData?.combined_prediction !== undefined ? predictionData.combined_prediction.toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Line Graph */}
          <div className="mt-10 bg-white p-6 rounded-md shadow-md text-black">
            <h2 className="text-xl font-bold mb-4">Stock Value Trend</h2>
            <div className="h-96">
              {historicalData.length > 0 && predictionData ? (
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
                <p className="text-center text-gray-500">Loading chart...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aiprediction;