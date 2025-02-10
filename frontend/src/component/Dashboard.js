import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStock } from "./StockContext";
import InvestmentMetrics from "./InvestmentMetrics";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { stocks, removeStock } = useStock();
  const [updatedStocks, setUpdatedStocks] = useState(stocks);
  // Polling interval (5 seconds)
  const POLLING_INTERVAL = 5000;

  const fetchStockData = useCallback(async () => {
    const updatedStocksData = await Promise.all(
      updatedStocks.map(async (stock) => {
        try {
          // Fetch real-time price from the backend API
          const backendResponse = await axios.get(
            `http://localhost:6005/api/stock/${stock.name}`
          );
          console.log("Backend Response for", stock.name, ":", backendResponse.data);

          // Extract the latest price from the historical data
          const historicalData = backendResponse.data;
          const lastClosePrice = parseFloat(localStorage.getItem(`lastClosePrice_${stock.name}`));
          const latestPrice =
            historicalData.length > 0
              ? historicalData[historicalData.length - 1].close
              : lastClosePrice || null;

          if (latestPrice !== null) {
            localStorage.setItem(`lastClosePrice_${stock.name}`, latestPrice);
          }

          // Calculate the current price
          const currentPrice = stock.qty * latestPrice;

          // Fetch AI prediction using the /api/predict endpoint
          const predictResponse = await axios.post("http://localhost:6005/api/predict", {
            ticker: stock.name, // Ensure the ticker is sent correctly
          });
          console.log("Prediction Response for", stock.name, ":", predictResponse.data);

          // Validate the prediction response
          if (predictResponse.data.ticker !== stock.name) {
            throw new Error(`Mismatched ticker: expected ${stock.name}, got ${predictResponse.data.ticker}`);
          }

          // Extract the combined prediction from the response
          const aiPrediction = predictResponse.data.combined_prediction || "N/A";

          // Return updated stock data
          return {
            ...stock,
            stockValue: typeof latestPrice === "number" && !isNaN(latestPrice) ? latestPrice.toFixed(2) : "N/A",
            currentPrice: typeof currentPrice === "number" && !isNaN(currentPrice) ? currentPrice.toFixed(2) : "N/A",
            aiPrediction: typeof aiPrediction === "number" && !isNaN(aiPrediction) ? aiPrediction.toFixed(2) : "N/A",
          };
        } catch (error) {
          console.error("Error fetching stock data for", stock.name, ":", error);

          // Preserve existing data if the API call fails
          return stock;
        }
      })
    );

    // Update state conditionally based on stock name
    setUpdatedStocks((prevStocks) =>
      prevStocks.map((prevStock) => {
        const updatedStock = updatedStocksData.find((stock) => stock.name === prevStock.name);
        return updatedStock || prevStock; // Preserve existing data if no update is available
      })
    );
  }, [updatedStocks]);

  useEffect(() => {
    let intervalId;

    // Always fetch stock data
    fetchStockData();

    // Set up polling
    intervalId = setInterval(fetchStockData, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [stocks, fetchStockData]);

  // Calculate total investment price
  const totalInvestmentPrice = updatedStocks.reduce((total, item) => {
    return total + parseFloat(item.price || 0);
  }, 0);

  // Calculate total current price
  const totalCurrentPrice = updatedStocks.reduce((total, item) => {
    return total + parseFloat(item.currentPrice || 0);
  }, 0);

  // Navigate to add stock page
  const goToStock = () => {
    navigate("/stockcrypto");
  };

  // Remove a stock from the list
  const handleRemoveStock = (stockName) => {
    removeStock(stockName);
  };

  return (
    <div>
      <div className="bg-BannerBlue h-48 w-full">
        <div className="text-center text-3xl font-bold pt-10">
          <h1>Dashboard</h1>
        </div>
        <p className="text-center mt-5 text-lg">
          View your portfolio performance at a glance
        </p>
      </div>
      <div>
        <InvestmentMetrics
          totalInvestmentPrice={totalInvestmentPrice}
          totalCurrentPrice={totalCurrentPrice}
        />
      </div>
      <div className="p-6 float-right mr-20">
        <button
          className="bg-BannerBlue text-black px-4 py-2 mt-12 ml-11 rounded mr-1"
          onClick={goToStock}
        >
          Add Stock
        </button>
      </div>
      <div className="p-6 mr-20 ml-20">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Invest Stock Value</th>
              <th className="border p-2">Investment Price</th>
              <th className="border p-2">Present Stock Value</th>
              <th className="border p-2">Current Price</th>
              <th className="border p-2">AI Prediction</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {updatedStocks.map((item, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.qty}</td>
                <td className="border p-2">{item.stockValue || "N/A"}</td>
                <td className="border p-2">{item.price}</td>
                <td className="border p-2">{item.stockValue || "N/A"}</td>
                <td className="border p-2">{item.currentPrice || "N/A"}</td>
                <td className="border p-2">{item.aiPrediction || "N/A"}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveStock(item.name)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;