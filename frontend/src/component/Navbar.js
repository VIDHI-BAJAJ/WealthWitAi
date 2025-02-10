import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import Logo from '../Images/logo.png';


const Navbar = ({ totalInvestmentPrice }) => {
  const { userdata, setUserdata, fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log('Profile userdata:', userdata); // Debugging userdata
  }, [userdata]);

  const handleNavigation = (path) => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const logout = async () => {
    try {
        await axios.get('http://localhost:6005/logout', { withCredentials: true });
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        setUserdata(null);
        navigate('/'); // Redirect to the login page
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
    }
};

  // Ensure userdata is not null before accessing displayName
  const displayName = userdata?.displayName || 'Unknown User';

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold"> 
            <img src = {Logo}  alt = "logo" className = "w-24 h-16 ml-16" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-7">
            {userdata ? (
              <>
                <li><Link to="/landing" className="text-gray-700 py-2 rounded-md" >Home</Link></li>
                <li><Link to="/dashboard" className="text-gray-700 py-2 rounded-md">Dashboard</Link></li>
                <li><Link to="/Aiprediction" className="text-gray-700 py-2 rounded-md">AI Prediction</Link></li>

                {/* Avatar & Dropdown */}
                <li className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 text-black px-3 py-2 rounded-full"
                  >
                    <ProfileImage displayName={displayName} />
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="text-gray-700 py-2 rounded-md">Home</Link></li>
                <li><Link to="/about" className="text-gray-700 py-2 rounded-md">About</Link></li>
                <li><Link to="/contact" className="text-gray-700 py-2 rounded-md">Contact</Link></li>
                <li><Link to="/login" className="bg-customBlue text-black px-4 py-2 rounded">Login</Link></li>
                <li><Link to="/signup" className="bg-customBlue text-black px-4 py-2 rounded">Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <ul className="bg-white space-y-2 py-4">
              {userdata ? (
                <>
                  <li><button onClick={() => handleNavigation('/landing')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Home</button></li>
                  <li><button onClick={() => handleNavigation('/dashboard')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</button></li>
                  <li><button onClick={() => handleNavigation('/Aiprediction')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">AI Prediction</button></li>
                  <li><button onClick={() => handleNavigation('/profile')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">User Profile</button></li>
                  <li><button onClick={logout} className="block w-24 bg-customBlue text-left ml-2 px-4 py-2 text-black hover:bg-gray-100">Logout</button></li>
                </>
              ) : (
                <>
                  <li><button onClick={() => handleNavigation('/')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Home</button></li>
                  <li><button onClick={() => handleNavigation('/about')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">About</button></li>
                  <li><button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</button></li>
                  <li><button onClick={() => handleNavigation('/login')} className="block w-24 text-left px-4 py-2 bg-customBlue text-gray-700 hover:bg-gray-100">Login</button></li>
                  <li><button onClick={() => handleNavigation('/signup')} className="block w-24 text-left px-4 py-2 bg-customBlue text-gray-700 hover:bg-gray-100">Signup</button></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
