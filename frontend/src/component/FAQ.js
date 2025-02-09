import React, { useState } from 'react';

const FAQ = () => {
  // Define FAQ data
  const faqData = [
    {
      question: 'Is my financial data secure on this platform?',
      answer: 'Yes, we prioritize user data security. All sensitive information is encrypted, and we follow industry best practices to ensure your data is stored and processed securely.'
    },
    {
      question: 'How does the platform analyze and optimize my portfolio?',
      answer: 'Our platform uses advanced AI and machine learning models to analyze your portfolio based on metrics like risk tolerance, diversification, and performance trends. It provides personalized recommendations to optimize your portfolio by suggesting rebalancing strategies and identifying opportunities for better returns.'
    },
    {
      question: 'Can I integrate my existing brokerage account with this platform?',
      answer: 'Yes, you can connect your existing brokerage account to our platform using secure APIs. This allows you to view and manage all your investments in one place, enabling better portfolio management and decision-making.'
    },
    {
      question: 'How frequently is the platform updated with market data?',
      answer: 'Our platform receives real-time market data updates to ensure that the analysis and insights provided to users are based on the latest information. This helps users make informed decisions and stay ahead of market trends.'
    }
  ];

  // State to manage the currently active question
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle the visibility of the answer
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h3 className="text-2xl text-center mb-8">FAQ's</h3>
      <h2 className="text-3xl font-bold text-center mb-8">Frequently asked questions</h2>
      <div>
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 mb-6 w-full">
            <button
              className="w-full py-4 text-left focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              <span className="flex justify-between items-center">
                <span className="font-semibold">{item.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform ${
                    activeIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div className={`px-4 pt-2 pb-4 ${activeIndex === index ? 'block' : 'hidden'}`}>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;