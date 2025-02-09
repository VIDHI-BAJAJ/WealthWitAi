import React from 'react';
import Technologystocks from '../Images/Technology Stocks.png';
import Commerical from '../Images/Commercial Properties.png';
import Bitcoin from '../Images/Bitcoin.png';
import Footer from './Footer';
import Banner from '../Images/BannerImage.png';

const Landing = () => {
  

  const features = [
    {
      title: "Technology Stocks",
      subtitle: "12%",
      image: Technologystocks,
    },
    {
      title: "Commercial Properties",
      subtitle: "8%",
      image: Commerical,
    },
    {
      title: "Bitcoin",
      subtitle: "20%",
      image: Bitcoin,
    },
  ];

  return (
    <>
      <div className='bg-BannerBlue h-48 w-full'>
        <div className='text-center text-3xl font-bold pt-10'>
          <h1>Welcome to Your Financial Portfolio Manager</h1>
        </div>
        <p className='text-center mt-5 text-lg'>Manage your investments with AI assistance</p>
      </div>
      {/* profile start */}
           <div className="flex flex-col md:flex-row items-center">
                     <div className="text-center md:text-left md:w-1/2">
                      <h1 className="mt-12 md:mt-32 md:ml-44  text-4xl font-bold">Welcome to our Financial Analytics Platform</h1>
                      <p className="mt-5 md:ml-44 text-lg">Make informed decisions with real-time data and AI predictions.</p>
                     </div>
                     <div className="mt-8 md:mt-0 md:w-2/2 flex justify-center">
                     <img src={Banner} alt="banner" className="h-64 w-96 md:ml-40 md:mt-16" />
                     </div>
                   </div>
      {/* profile end */}
      {/* feature start */}
      <div className='mt-16 mb-5'>
        <h3 className='text-center text-3xl font-bold'>Recommended Investments</h3>
        <p className='text-center mt-5'>Explore top performing assets</p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:ml-36 md:mt-12 md:mr-28">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img src={feature.image} alt={feature.title} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mt-2">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* feature end */}
      {/* market start */}
      {/* <Market/> */}
      {/* market end */}
      {/* footer start */}
      <Footer />
      {/* footer end */}
    </>
  );
};

export default Landing;