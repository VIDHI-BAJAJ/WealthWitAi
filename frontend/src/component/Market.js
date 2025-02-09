import React, { useEffect, useState } from 'react';

const Market = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStockData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchStockData = async () => {
    // Replace with your actual API call to fetch stock data
    const response = await fetch('#');
    const data = await response.json();
    setStockData(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Market Insights</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Stock Performance</h2>
          {stockData ? (
            <div>
              {/* Render your stock performance chart here */}
              <p>Price: {stockData.price}</p>
              <p>Time: {stockData.time}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-full md:w-1/2 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Asset Allocation</h2>
          {stockData ? (
            <div>
              {/* Render your asset allocation pie chart here */}
              <p>Asset Class: {stockData.assetClass}</p>
              <p>Percentage: {stockData.percentage}</p>
            </div>
          ) 
          : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;