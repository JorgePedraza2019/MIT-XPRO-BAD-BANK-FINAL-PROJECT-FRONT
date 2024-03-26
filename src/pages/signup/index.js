// SignUp.js
import React, { useState, useEffect } from "react";
import Card from "../../components/Card"; // Import the Card component, adjust the path according to your file structure
import crypto from "crypto-js"; // Import crypto-js for password hashing

export default function SignUp() {
  const [show, setShow] = useState(true); // State to control the visibility of the form
  const [status, setStatus] = useState(""); // State to manage the status message
  const handleShow = () => setShow(true); // Function to show the form

  return (
    <>
      {/* Render the form inside a Card component */}
      <br />
      <h4 style={{ paddingLeft: "20px", paddingTop: "20px" }}>
        CREATE ACCOUNT
      </h4>
      <Card
        className="card text-center"
        bgcolor="primary"
        status={status}
        body={
          show ? (
            <CreateForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <CreateMsg setShow={setShow} />
          )
        }
      />
    </>
  );
}

// Component for displaying a success message after creating an account
function CreateMsg({ setShow }) {
  return (
    <>
      <h5 style={{ color: "white" }}>Success</h5>
      <br />
      <button
        type="button"
        className="btn btn-light"
        onClick={() => setShow(true)}
      >
        Add another account
      </button>
      <button
        type="button"
        className="btn btn-light ms-2" // Add left margin to separate the buttons
        onClick={() => {
          // Redirect to the Signin view
          window.location.href = "/login"; // Change the URL to the one corresponding to the Signin view
        }}
      >
        Login
      </button>
    </>
  );
}

// Component for rendering the account creation form
function CreateForm({ setShow, setStatus }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle account creation
  const handleCreateAccount = async () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      alert("Error: All fields are required");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    if (!isValidEmail(email)) {
      alert("Error: Invalid email format");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    if (password.length < 8) {
      alert("Error: Password must have at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    const hashedPassword = crypto.SHA256(password).toString(); // Hash the password

    // Local mode
    // const url = `http://localhost:3001/account/create/${name}/${email}/${hashedPassword}`;

    // Server mode
    const url = `http://35.168.60.156:80/account/create/${name}/${email}/${hashedPassword}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      alert("Account created successfully");
      setShow(false); // Hide the form after creating the account
    } catch (error) {
      alert("Failed to create account");
      console.error("Error creating account:", error);
      setShow(true); // Show the form after creating the account
    }
  };

  return (
    <>
      {/* Name input */}
      <input
        type="text"
        className="form-control"
        name="name"
        placeholder="NAME"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      {/* Email input */}
      <input
        type="email"
        className="form-control"
        name="email"
        placeholder="EMAIL"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      {/* Password input */}
      <input
        type="password"
        className="form-control"
        name="password"
        placeholder="PASSWORD"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      {/* Create account button */}
      <button
        disabled={!formData.name || !formData.email || !formData.password}
        type="button"
        className="btn btn-light"
        onClick={handleCreateAccount}
      >
        CREATE ACCOUNT
      </button>
    </>
  );
}
