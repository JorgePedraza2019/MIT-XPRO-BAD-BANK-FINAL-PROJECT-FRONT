// Login.js
import React, { useState, useContext, useEffect } from "react";
import Card from "../../components/Card"; // Importing Card component
import { UserContext } from "../../contexts/UserContextProvider"; // Importing UserContext from context
import { useRouter } from "next/router"; // Importing useRouter from Next.js for routing

export default function Login() {
  const [show, setShow] = useState(true); // State to control whether to show the login form
  const [status, setStatus] = useState(""); // State to manage status messages
  const { loginUser, currentUser } = useContext(UserContext); // Accessing loginUser function and currentUser object from context
  const router = useRouter(); // Accessing useRouter for routing

  // Redirect to home page if a user is already logged in
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <>
      {/* Rendering the login form inside a Card component */}
      <br />
      <h4 style={{ paddingLeft: "20px", paddingTop: "20px" }}>LOGIN</h4>
      <Card
        className="card text-center"
        bgcolor="secondary"
        status={status}
        body={
          show ? (
            <LoginForm
              setShow={setShow}
              setStatus={setStatus}
              loginUser={loginUser}
            />
          ) : null
        }
      />
    </>
  );
}

// LoginForm component for rendering the login form
function LoginForm(props) {
  const [email, setEmail] = useState(""); // State for managing email input
  const [password, setPassword] = useState(""); // State for managing password input

  // Function to handle the login process
  const handle = async () => {
    // Validate email format
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      // Call loginUser function to login with email and password
      const response = await props.loginUser(email, password);
      // Reset status and hide the form on successful login
      props.setStatus("");
      props.setShow(false);
    } catch (error) {
      // Display error message if login fails
      props.setStatus(alert(error.message));
      console.log("Error logging in:", error.message);
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <>
      {/* Email input */}
      <input
        type="input"
        className="form-control"
        name="email"
        placeholder="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      {/* Password input */}
      <input
        type="password"
        className="form-control"
        name="password"
        placeholder="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      {/* Login button */}
      <button
        type="button"
        className="btn btn-light"
        onClick={handle}
        disabled={!email || !password} // Disable button if email or password is empty
      >
        LOGIN
      </button>
    </>
  );
}
