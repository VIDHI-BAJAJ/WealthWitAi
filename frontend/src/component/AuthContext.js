import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:6005/login/success', {
                withCredentials: true, // Ensure cookies are sent
            });
            console.log('Fetched user:', response.data.user);
            setUserdata(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUserdata(null);
        }
    };
    
    
  
    fetchUser();
  }, []);

  const [data, setdata] = useState(null);

    useEffect(() => {
      // If you have a method to check if the user is logged in, do it here.
      // Example: check if the token or user data exists in localStorage
      const DataFromStorage = JSON.parse(localStorage.getItem("user"));
      if (DataFromStorage) {
        setdata(DataFromStorage); // Set the user data from storage
      }
    }, []);
  
  return (
    <AuthContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </AuthContext.Provider>
  );
};