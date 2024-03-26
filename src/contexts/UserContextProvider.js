import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import crypto from "crypto-js";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State for the current user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is authenticated
  const router = useRouter();

  // Function to hash the password using SHA256
  const hashPassword = (password) => {
    return crypto.SHA256(password).toString(crypto.enc.Hex);
  };

  // Function to login a user
  const loginUser = async (email, password) => {
    try {
      const hashedPassword = hashPassword(password);
      // Local mode
      // const response = await fetch(
      //   `http://localhost:3001/account/login/${email}/${hashedPassword}`
      // );
      
      // Server mode
      const response = await fetch(
         `http://35.168.60.156:80/account/login/${email}/${hashedPassword}`
       );
      const text = await response.text();
      if (response.ok) {
        const data = JSON.parse(text);
        localStorage.setItem("token", data.token); // Store the session token
        const userData = { ...data.user }; // Copy user information
        delete userData.token; // Remove token from user object
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return true; // Login successful
      } else {
        throw new Error(text || "Error logging in");
      }
    } catch (error) {
      throw new Error("Error logging in");
    }
  };

  // Function to logout the user
  const logoutUser = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    router.push("/"); // Redirect to homepage after logout
  };

  // Check if user is logged in on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Provide the UserContext to child components
  return (
    <UserContext.Provider
      value={{ loginUser, logoutUser, currentUser, setCurrentUser, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
