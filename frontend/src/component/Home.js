import React  from 'react';
// import axios from "axios";
import Footer from './Footer';
import Banner from '../Images/BannerImage.png';
import FeatureAi from '../Images/FeatureImageAi.png';
import FeatureRisk from '../Images/FeatureImageRisk.png';
import FeatureData from '../Images/FeatureImageData.png';
import Feature from '../Images/FeatureImage.png';
import Graph from '../Images/graph.png';
const Home = () => {
    const features = [
        {
          title: "AI Predictions",
          subtitle: "Real-time data insights",
          category: "Forecasting",
          icon: "💡",
          image: FeatureAi,
        },
        {
          title: "Risk Analysis",
          subtitle: "Identify potential risks",
          category: "Risk Management",
          icon: "📈",
          image: FeatureRisk,
        },
        {
          title: "Real-time Data",
          subtitle: "Instant access to data",
          category: "Data Analytics",
          icon: "📊",
          image: FeatureData,
        },
    ];

 

        return (
            <>
            {/* main */}
             <div className="flex flex-col md:flex-row items-center">
               <div className="text-center md:text-left md:w-1/2">
                <h1 className="mt-12 md:mt-32 md:ml-44  text-4xl font-bold">Welcome to our Financial Analytics Platform</h1>
                <p className="mt-5 md:ml-44 text-lg">Make informed decisions with real-time data and AI predictions.</p>
               </div>
               <div className="mt-8 md:mt-0 md:w-2/2 flex justify-center">
               <img src={Banner} alt="banner" className="h-64 w-96 md:ml-40 md:mt-16" />
               </div>
             </div>
             {/* endmain */}
             {/* feature */}
             <div className="mt-12 py-12 px-6">
              <div className="flex flex-col md:flex-row items-center">
              <div className="text-center md:text-left md:w-2/3">
               <h2 className="text-3xl font-bold text-center mb-6 md:mr-72">Key Features</h2>
               <p className="text-center text-gray-600 mb-8 md:ml-24 md:mr-72">Explore the power of financial analytics.</p>
              <div className="flex justify-center mb-8 md:mr-80">
              <button className="px-6 py-2 bg-white-600 text-black border-black border-2 focus:outline-none">Learn More</button>
              </div>
              </div>
              <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
              <img src={Feature} alt="feature" className="md:h-32 md:w-32 md:mr-28 mb-14 h-48 w-64 " />
              </div>
              </div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:ml-36 md:mt-12 md:mr-28">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white  shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img src={feature.image} alt={feature.title} className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <span className="text-sm text-gray-500">{feature.category}</span>
              <h3 className="text-xl font-semibold mt-2">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.subtitle}</p>
              <div className="flex items-center mt-4">
                <span className="text-lg">{feature.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* endfeature */}
    {/* graph */}
    <div className='flex flex-col md:flex-row'>
    <div className="p-6 mb-10">
      <h2 className="text-2xl font-bold mb-4 md:ml-40">Real-time Insights</h2>
      <p className="text-gray-600 mb-4 md:ml-40">Track your financial performance effortlessly.</p>
      <button className="px-6 py-2 bg-white-600 text-black border-black border-2 focus:outline-none md:ml-40 md:mb-12">View Chart</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:pl-40 pr-24">
        <div className="p-4 border-gray border-2 focus:outline-none w-full sm:w-64 mt-5">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">$10,000</p>
          <p className="text-green-500">+3%</p>
        </div>
        <div className="p-4 border-gray border-2 focus:outline-none w-full sm:w-64 mt-5">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <p className="text-2xl font-bold">$5,000</p>
          <p className="text-red-500">-2%</p>
        </div>
      </div>
    </div>
    <div className='p-4 border-gray border-2 focus:outline-none w-full md:w-96 h-80 '>
        <h1 className='text-2xl font-bold mb-4 mt-5'>Financial Performance Chart</h1>
        <p className='text-gray-600 mb-4'>Amount</p>
        <img src={Graph} alt="graph" className="h-40 w-full md:w-72 ml-0 md:ml-8" />
    </div>
</div>
    {/* end graph */}
  
    {/* footer */}
     <Footer/>
    {/* end footer */}
            </>
            
        );
    }


export default Home;