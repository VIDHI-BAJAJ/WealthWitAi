import React, { useState , useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserdata, fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await axios.post("http://localhost:6005/auth/login/success", { email, password });
//         console.log("Full Login Response:", response); // Debugging

//         if (response.data.status) {
//             setUserdata(response.data.user);
//             await fetchUser(); 
//             navigate('/stockmarket');  
//         } else {
//             console.log("Navigation condition not met:", response.data);
//         }
//     } catch (err) {
//         console.error("Login Error:", err.response ? err.response.data : err);
//         alert(err.response?.data?.message || "Login failed");
//     }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      // First, login to get the token and user data
      const loginResponse = await axios.post(
          "http://localhost:6005/auth/login", 
          { email, password },
          { withCredentials: true }
      );
      
      console.log("Login Response:", loginResponse.data); // Debug log

      if (loginResponse.data.status) {
          const userData = loginResponse.data.user;
          setUserdata(userData);
          navigate('/stockmarket');
      }
  } catch (err) {
      console.error("Login Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
  }
};



  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
    const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error');
  if (error) {
    alert(error); 
  }
  };

  return (
  <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
             type="submit"
            className="w-full bg-customBlue text-black py-2 rounded-lg transition"
           >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Not Registered?{' '}
          <a href= "/Signup" className="text-green-500 hover:underline">
            Create an account
          </a>
        </p>
        <button
          onClick={loginWithGoogle}
          className="mt-6 flex items-center justify-center w-full py-2 border border-gray-300 bg-white rounded-lg hover:shadow-md transition"
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
            alt="Google Icon"
            className="w-5 h-5 mr-2"
          />
          Login In with Google
        </button>
      </div>
    </div>
    </>
  );
};

export default Login;
