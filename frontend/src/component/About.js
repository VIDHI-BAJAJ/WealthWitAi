
import React from 'react';
import Footer from './Footer';
import AboutImg from '../Images/AboutImg.png'

const About = () =>{
    return(
        <>
           {/* main */}
                     <div className="flex flex-col md:flex-row items-center">
                       <div className="text-center md:text-left md:w-1/2">
                        <h1 className="mt-12 md:mt-32 md:ml-44  text-4xl font-bold">About Us </h1>
                        <p className="mt-5 md:ml-44 text-lg">"We are a forward-thinking team committed to leveraging technology and artificial intelligence to simplify financial decision-making. Our goal is to empower individuals with smart tools that make investing accessible, efficient, and tailored to their unique needs."</p>
                       </div>
                       <div className="mt-8 md:mt-0 md:w-2/2 flex justify-center">
                       <img src={AboutImg}  alt="banner" className="h-64 w-96 md:ml-40 md:mt-16" />
                       </div>
                     </div>
                     {/* endmain */}
       {/* ourvison */}
      <div className='bg-blue-200 h-auto md:h-52 mx-4 md:mx-28 mb-24 mt-12 p-4 md:p-0'>
  <h2 className='text-3xl text-center mt-2 pt-10'>Our Vision</h2>
  <p className='text-justify mt-5 mb-32 text-xl mx-4 md:mx-12'>
    To redefine personal finance by providing innovative, AI-driven solutions that enable everyone to achieve their financial goals with confidence.
  </p>
</div>
      {/* endvision */}
      {/* value */}
      <div className='h-fit'>
  <h1 className='text-4xl text-center mt-12'>Our Values</h1>
  <div className='flex flex-col md:flex-row flex-wrap justify-center'>
    <div className='h-40 w-full md:w-1/3 lg:w-1/4 rounded shadow-md mt-12 mx-4 border-2'>
      <h5 className='text-xl text-center pt-2'>Innovation First</h5>
      <p className='text-md mx-4 mt-5 text-justify'>We embrace cutting-edge technology to drive meaningful change and deliver impactful solutions.</p>
    </div>
    <div className='h-40 w-full md:w-1/3 lg:w-1/4 rounded shadow-md mt-12 mx-4 border-2'>
      <h5 className='text-xl text-center pt-2'>User-Centric</h5>
      <p className='text-md mx-4 mt-5 text-justify'>Our users are at the heart of everything we do, ensuring seamless, personalized, and exceptional experiences.</p>
    </div>
    <div className='h-40 w-full md:w-1/3 lg:w-1/4 rounded shadow-md mt-12 mx-4 border-2'>
      <h5 className='text-xl text-center pt-2'>Sustainability</h5>
      <p className='text-md mx-4 mt-5 text-justify'>We are dedicated to creating solutions that promote sustainable growth.</p>
    </div>
    <div className='h-40 w-full md:w-1/3 lg:w-1/4 rounded shadow-md mt-12 mx-4 border-2'>
      <h5 className='text-xl text-center pt-2'>Transparency</h5>
      <p className='text-md mx-4 mt-5 text-justify'>We prioritize honesty and clarity, building trust through open and reliable communication.</p>
    </div>
    <div className='h-40 w-full md:w-1/3 lg:w-1/4 rounded shadow-md mt-12 mx-4 border-2'>
      <h5 className='text-xl text-center pt-2'>Excellence</h5>
      <p className='text-md mx-4 mt-5 text-justify'>We are committed to achieving the highest standards in quality, performance, and innovation.</p>
    </div>
    <div className='h-40 w-full md:w-1/3 lg:w-1/4 rounded shadow-md mt-12 mx-4 border-2'>
      <h5 className='text-xl text-center pt-2'>Adaptability</h5>
      <p className='text-md mx-4 mt-5 text-justify'>We embrace change and continuously innovate to stay ahead in the ever-evolving landscape of technology and finance.</p>
    </div>
  </div>
</div>
       <Footer/>
        </>
    )
}
export default About;
