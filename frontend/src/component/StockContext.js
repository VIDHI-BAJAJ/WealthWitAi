import React, { createContext, useState, useContext, useEffect } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Load stocks from local storage on component mount
    const savedStocks = JSON.parse(localStorage.getItem('stocks')) || [];
    setStocks(savedStocks);
  }, []);

  useEffect(() => {
    // Save stocks to local storage whenever stocks change
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  const addStock = (newStocks) => {
    setStocks(newStocks);
  };

  const removeStock = (stockName) => {
    setStocks(stocks.filter(stock => stock.name !== stockName));
  };

  return (
    <StockContext.Provider value={{ stocks, addStock, removeStock }}>
      {children}
    </StockContext.Provider>
  );
};

// Define the useStock hook
export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};