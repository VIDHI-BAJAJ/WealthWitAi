import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InvestmentMetrics = ({ totalInvestmentPrice, totalCurrentPrice }) => {
  // Calculate total profit
  const totalProfit = totalCurrentPrice - totalInvestmentPrice;

  // Determine the color for totalProfit based on its value
  const profitColor = totalCurrentPrice > totalInvestmentPrice ? 'text-green-500' : 'text-red-500';

  // Format data for Recharts
  const chartData = [
    {
      name: 'Portfolio Metrics',
      'Investment Price': totalInvestmentPrice || 0,
      'Current Price': totalCurrentPrice || 0,
      'Net Profit': totalProfit,
    }
  ];

  const formatCurrency = (value) => {
    if (value === undefined || value === null) {
      return '₹0.00';
    }
    return `₹${value.toFixed(2)}`;
  };

  return (
    <div className="flex flex-row space-x-10 mt-10 p-10 h-full bg-white">
      {/* Left Side - Metrics */}
      <div className="flex flex-col space-y-6 w-1/2 ml-14">
        <div className="text-4xl font-bold ml-10">Key Investment Metrics</div>
        <p className="text-xl ml-10">Track your portfolio performance</p>
        {/* Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border border-gray-300 w-48 ml-12">
            <div className="text-sm text-gray-400">Investment Price</div>
            <div className="text-2xl font-bold">{formatCurrency(totalInvestmentPrice)}</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-300 w-44 ml-14">
            <div className="text-sm text-gray-400">Current Price</div>
            <div className="text-2xl font-bold">{formatCurrency(totalCurrentPrice)}</div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-300 w-96 ml-12">
          <div className="text-sm text-gray-400">Total Profit/Loss</div>
          <div className={`text-2xl font-bold ${profitColor}`}>{formatCurrency(totalProfit)}</div>
        </div>
      </div>
      <div className='flex flex-col space-y-6 w-1/2 border-gray-400 rounded-lg'>
        <div className="text-2xl font-bold ml-10">Portfolio Allocation</div>
        <p className="text-xl ml-10">Percentage</p>
        {/* Bar Graph */}
        <div className="h-80 w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={true} 
                tickLine={true}
              />
              <YAxis 
                tickFormatter={(value) => `₹${value}`}
                axisLine={true}
                tickLine={true}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toFixed(2)}`, '']}
                labelFormatter={() => ''}
                cursor={false}
              />
              <Legend />
              <Bar 
                dataKey="Investment Price" 
                fill="rgba(54, 162, 235, 0.8)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="Current Price" 
                fill="rgba(75, 192, 192, 0.8)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="Net Profit" 
                fill="rgba(153, 102, 255, 0.8)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InvestmentMetrics;