import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const AuthLayout = ({ children }) => {
  // Get the setCurrentUser function from the UserContext
  const { setCurrentUser } = useContext(UserContext);

  // useEffect hook to run when the component mounts
  useEffect(() => {
    // Check if there is a token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Split the token into its parts and decode the middle part (payload)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedToken = JSON.parse(window.atob(base64));
        console.error("decodedToken:", decodedToken);

        // Create a user object with the decoded token data
        const user = {
          _id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          password: decodedToken.password,
          balance: decodedToken.balance,
          role: decodedToken.role
        };
  
        // Set the user object in the UserContext
        setCurrentUser(user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [setCurrentUser]); // Only run this effect when setCurrentUser changes

  // Render the children components
  return <>{children}</>;
};

export default AuthLayout;
