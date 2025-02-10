import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Single state to manage user data
  const [userdata, setUserdata] = useState(null);

  // Fetch user data from the backend on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:6005/login/success', {
          withCredentials: true, // Ensure cookies are sent
        });
        console.log('Fetched user:', response.data.user);
        setUserdata(response.data.user); // Update userdata state
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store in local storage
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserdata(null); // Clear userdata if there's an error
      }
    };

    fetchUser();
  }, []);

  // Check local storage for user data on component mount
  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
    if (userDataFromStorage) {
      setUserdata(userDataFromStorage); // Set userdata from local storage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </AuthContext.Provider>
  );
};