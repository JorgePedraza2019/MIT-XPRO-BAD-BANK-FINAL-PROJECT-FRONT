import React from "react"; // Importing React
import "../styles/globals.css"; // Importing global styles
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import Navbar from "../components/Navbar"; // Importing Navbar component
import UserContextProvider from "../contexts/UserContextProvider"; // Importing UserContextProvider
import AuthLayout from "@/components/AuthLayout"; // Importing AuthLayout component

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider> {/* Providing the UserContext to the application */}
      <div>
        <AuthLayout> {/* Using AuthLayout for layout structure */}
          <Navbar /> {/* Including the Navbar component */}
          <Component {...pageProps} /> {/* Rendering the main component */}
        </AuthLayout>
      </div>
    </UserContextProvider>
  );
}

export default MyApp;
