import React from 'react'
import Footerimg from '../Images/Footer.png'

function Footer() {
  return (
    <div>
        {/* footer */}
          <div>
              {/* <img src={Footerimg} alt="footer" className="h-80 w-9/12 px-4 md:px-36" /> */}
          </div>
      
          <div className='flex flex-col md:flex-row items-center md:ml-36 mt-12 mb-12'>
                  <p className='md:ml-96 mb-4 md:mb-0'>Terms of Service</p>
                  <p className='md:ml-12'>Privacy Policy</p>
          </div>
          {/* end footer */}
    </div>
  )
}

export default Footer