import React from 'react';
import FAQ from '../component/FAQ'
import Footer from "./Footer";
import Contact from '../Images/Contact.png'


const ContactUs = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "31830077-a1be-4195-a8da-4ed648536391");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
        }
      };
    return (
        <>
           
            <div
  className="relative h-[500px] bg-cover bg-center"
  style={{ backgroundImage: `url(${Contact})` }}
>
  <div className="container mx-auto px-4">
    <h1 className="text-white text-center lg:text-left pt-10 sm:pt-16 lg:pt-28 text-2xl sm:text-3xl lg:text-4xl font-bold md:pl-44">
      Contact Us <br />
      and Unleash your idea
    </h1>
    <p className="text-white text-center lg:text-left pt-3 sm:pt-5 text-base sm:text-lg lg:text-xl md:pl-44">
      Let's start a conversation. Your feedback matters!
    </p>
    <div className="absolute top-40 lg:top-24 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:right-60 ml-1 md:ml-12">
      <div className="bg-white w-full max-w-md mx-auto lg:mx-0 p-6 rounded-md shadow-md md:ml-12">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium">
              Name:
              <input
                type="text"
                name="name"
                className="h-10 w-full mt-2 rounded-sm shadow-md bg-gray-100 border border-gray-300 px-3"
                required
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium">
              Email:
              <input
                type="email"
                name="email"
                className="h-10 w-full mt-2 rounded-sm shadow-md bg-gray-100 border border-gray-300 px-3"
                required
              />
            </label>
          </div>
          <div className="flex flex-col mb-6">
            <label className="text-sm font-medium">
              Message:
              <textarea
                name="message"
                className="h-20 w-full mt-2 rounded-sm shadow-md bg-gray-100 border border-gray-300 px-3"
                required
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="bg-customBlue text-black h-12 w-full rounded-md shadow-md font-medium transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

            <div className='mb-12 mt-24 md:ml-6'>
                <FAQ/>
            </div>
            <Footer/>
        </>
    );
}
export default ContactUs;