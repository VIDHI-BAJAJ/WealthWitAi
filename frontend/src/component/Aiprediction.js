// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Search } from "lucide-react";

// const Aiprediction = () => {
//   const [stockSymbol, setStockSymbol] = useState('');
//   const [predictionData, setPredictionData] = useState(null);
//   const [popularStocksData, setPopularStocksData] = useState([]);
//   const [marketNews, setMarketNews] = useState([]);
//   const [error, setError] = useState('');

//   // Popular stock symbols
//   const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX'];

//   // Fetch popular stocks data
//   useEffect(() => {
//     const fetchPopularStocks = async () => {
//       try {
//         const responses = await Promise.all(
//           popularStocks.map((ticker) =>
//             axios.post('/api/predict', { ticker })
//           )
//         );
//         const data = responses.map((res) => res.data);
//         setPopularStocksData(data);
//       } catch (err) {
//         console.error("Error fetching popular stocks data:", err);
//       }
//     };
//     fetchPopularStocks();
//   }, []);

//   // Fetch market news every 10 minutes
//   useEffect(() => {
//     const fetchMarketNews = async () => {
//       try {
//         const response = await axios.get('https://newsapi.org/v2/everything', {
//           params: {
//             q: 'stock market',
//             apiKey: 'YOUR_NEWS_API_KEY', // Replace with your NewsAPI key
//             sortBy: 'publishedAt',
//             pageSize: 5,
//           },
//         });
//         setMarketNews(response.data.articles);
//       } catch (err) {
//         console.error("Error fetching market news:", err);
//       }
//     };

//     fetchMarketNews(); // Initial fetch
//     const intervalId = setInterval(fetchMarketNews, 10 * 60 * 1000); // Fetch every 10 minutes
//     return () => clearInterval(intervalId); // Cleanup interval on unmount
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await axios.post('/api/predict', { ticker: stockSymbol });
//       setPredictionData(response.data);
//     } catch (err) {
//       setError('Error fetching prediction data. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div>
//         <div className="bg-BannerBlue h-48 w-full">
//           <div className="text-center text-3xl font-bold pt-10">
//             <h1>AI Predictions</h1>
//           </div>
//           <p className="text-center mt-5 text-lg">AI-powered insights for smarter stock market predictions!</p>
//         </div>
//       </div>

//       <div>
//         <form onSubmit={handleSubmit} className="flex flex-row items-center w-full max-w-lg mx-auto mt-24 relative">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Enter Stock Symbol"
//               value={stockSymbol}
//               onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
//               className="p-2 w-full rounded-md text-black mb-4 mt-5 relative border-2 rounded-lg flex items-center bg-white pl-10"
//             />
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
//               <Search size={20} />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-BannerBlue text-black px-6 py-2 rounded-md ml-4"
//           >
//             Predict
//           </button>
//         </form>
// <div className="ml-12 flex space-x-4">
// {popularStocks.map((stock) => (
//   <button
//     key={stock}
//     onClick={() => setStockSymbol(stock)}
//     className="bg-gray-300 text-black px-4 py-1 rounded-lg ml-96"
//   >
//     {stock}
//   </button>
// ))}
// </div>

//        {/* Popular Stocks Section */}
//      <div className="mt-10 w-full max-w-4xl mx-auto">
//    <h2 className="text-2xl font-bold text-center mb-6">Popular Stocks</h2>
//  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//    {popularStocksData.map((stock) => (
//               <div key={stock.ticker} className="bg-white p-6 rounded-md shadow-md text-black">
//                 <img
//                   src={`https://logo.clearbit.com/${stock.ticker}.com`}
//                   alt={`${stock.ticker} logo`}
//                   className="w-12 h-12 mx-auto mb-4"
//                   onError={(e) => (e.target.src = '/default-logo.png')} // Fallback image
//                 />
//                 <h3 className="text-xl font-bold text-center">{stock.ticker}</h3>
//                 <p className="text-center mt-2">Current: ${stock.currentValue.toFixed(2)}</p>
//                 <p className="text-center">Predicted: ${stock.predictedValue.toFixed(2)}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Market News Section */}
//         <div className="mt-10 w-full max-w-4xl mx-auto">
//           <h2 className="text-2xl font-bold text-center mb-6">Market News</h2>
//           <div className="space-y-4">
//             {marketNews.length > 0 ? (
//               marketNews.map((article, index) => (
//                 <div key={index} className="bg-white p-4 rounded-md shadow-md text-black">
//                   <a href={article.url} target="_blank" rel="noopener noreferrer">
//                     <h3 className="text-lg font-bold">{article.title}</h3>
//                   </a>
//                   <p className="text-sm text-gray-600">{new Date(article.publishedAt).toLocaleString()}</p>
//                   <p className="mt-2">{article.description}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">Loading market news...</p>
//             )}
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//         {/* Prediction Results */}
//         {predictionData && (
//           <div className="mt-10 w-full max-w-4xl mx-auto">
//             {/* Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded-md shadow-md text-black">
//                 <h2 className="text-xl font-bold">Stock Symbol</h2>
//                 <p className="mt-2">{predictionData.ticker}</p>
//               </div>
//               <div className="bg-white p-6 rounded-md shadow-md text-black">
//                 <h2 className="text-xl font-bold">Current Value</h2>
//                 <p className="mt-2">${predictionData.currentValue.toFixed(2)}</p>
//               </div>
//               <div className="bg-white p-6 rounded-md shadow-md text-black">
//                 <h2 className="text-xl font-bold">Predicted Value</h2>
//                 <p className="mt-2">${predictionData.predictedValue.toFixed(2)}</p>
//               </div>
//             </div>
//             {/* Line Graph */}
//             <div className="mt-10 bg-white p-6 rounded-md shadow-md text-black">
//               <h2 className="text-xl font-bold mb-4">Stock Value Trend</h2>
//               <div className="h-64">
//                 {/* Replace this with your actual chart library */}
//                 <p className="text-center text-gray-500">Line graph of current vs predicted values goes here.</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Aiprediction;

import React, { useState } from 'react';
import axios from 'axios';
import { Search } from "lucide-react";

const Aiprediction = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState('');

  // Popular stock symbols
  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX'];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get('http://localhost:6005/api/predict', { ticker: stockSymbol });
      setPredictionData(response.data);
    } catch (err) {
      setError('Please try again.');
    }
  };

  return (
    <>
    <div>
      <div className="bg-BannerBlue h-48 w-full">
        <div className="text-center text-3xl font-bold pt-10">
        <h1>AI Predictions</h1>
      </div>
      <p className="text-center mt-5 text-lg">AI-powered insights for smarter stock market predictions!</p>
      </div>
      </div>
     
      <div >
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
    className="bg-BannerBlue text-black px-6 py-2 rounded-md  ml-4"
  >
    Predict
  </button>
</form>

      {/* Popular Stocks */}
      <div className="ml-12 flex space-x-4">
        {popularStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => setStockSymbol(stock)}
            className="bg-gray-300 text-black px-4 py-1 rounded-lg ml-96"
          >
            {stock}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Prediction Results */}
      {predictionData && (
        <div className="mt-10 w-full max-w-4xl">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md text-black">
              <h2 className="text-xl font-bold">Stock Symbol</h2>
              <p className="mt-2">{predictionData.ticker}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md text-black">
              <h2 className="text-xl font-bold">Current Value</h2>
              <p className="mt-2">${predictionData.currentValue.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md text-black">
              <h2 className="text-xl font-bold">Predicted Value</h2>
              <p className="mt-2">${predictionData.predictedValue.toFixed(2)}</p>
            </div>
          </div>

          {/* Line Graph */}
          <div className="mt-10 bg-white p-6 rounded-md shadow-md text-black">
            <h2 className="text-xl font-bold mb-4">Stock Value Trend</h2>
            <div className="h-64">
              {/* Replace this with your actual chart library */}
              <p className="text-center text-gray-500">Line graph of current vs predicted values goes here.</p>
            </div>
          </div>
        </div>
      )}
      </div>
      </>
  );
};

export default Aiprediction;