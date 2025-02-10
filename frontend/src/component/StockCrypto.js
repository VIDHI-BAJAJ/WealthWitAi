import React, { useState } from "react";
import { useStock } from "./StockContext";
import { useNavigate } from "react-router-dom";

const StockCrypto = () => {
  const [stocks, setStocks] = useState([{ name: "", qty: "", price: "",investstockvalue: "" }]);
  const { addStock } = useStock();

  const handleStockInputChange = (index, e) => {
    const { name, value } = e.target;
    const newStocks = [...stocks];
    newStocks[index][name] = value;
    setStocks(newStocks);
  };

  const navigate = useNavigate();

  const submitStocks = () => {
    addStock(stocks);
    navigate('/dashboard');
    console.log("Submitted Stocks:", stocks);
  };

    // Function to handle navigation
    const handleNavigation = () => {
        navigate("/landing"); // Navigate to the landing page
    };
  return (
    <div className="p-6 space-y-6">
      <h2 className="font-bold text-center text-2xl">Enter Your Stock Data Manually</h2>

      {stocks.map((stock, index) => (
        <div key={index} className="border p-4 rounded-lg shadow mb-4">
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Stock {index + 1}</h2>
            <div className="grid grid-cols-3 gap-2 mt-5">
              <input
                name="name"
                placeholder="Stock Name(BO. /NO.)"
                value={stock.name}
                onChange={(e) => handleStockInputChange(index, e)}
                className="border p-2 rounded w-full"
              />
              <input
                name="qty"
                placeholder="Quantity"
                type="number"
                value={stock.qty}
                onChange={(e) => handleStockInputChange(index, e)}
                className="border p-2 rounded w-full"
              />
              <input
                name="price"
                placeholder="Investment Price"
                type="number"
                value={stock.price}
                onChange={(e) => handleStockInputChange(index, e)}
                className="border p-2 rounded w-full"
              />
              <input
                name="investstockvalue"
                placeholder="Stock Value"
                type="number"
                value={stock.investstockvalue}
                onChange={(e) => handleStockInputChange(index, e)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setStocks([...stocks, { name: "", qty: "", price: "" }])}>
          + Add Stock
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2" onClick={submitStocks}>
          Submit
        </button>
        <button
            className="bg-customBlue text-black px-4 py-2 rounded ml-2"
            onClick={handleNavigation} // Attach the click handler
        >
            No New Entry
        </button>
      </div>
    </div>
  );
};

export default StockCrypto;