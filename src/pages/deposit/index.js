import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Deposit component
export default function Deposit() {
  const [show, setShow] = useState(true); // State to control showing deposit form or message
  const [status, setStatus] = useState(""); // State for status message

  return (
    <>
      <br />
      <h4 style={{ paddingLeft: "20px", paddingTop: "20px" }}>DEPOSIT</h4>
      {/* Display a Card component with either DepositForm or DepositMsg based on 'show' state */}
      <Card
        bgcolor="warning"
        status={status}
        body={
          show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <DepositMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </>
  );
}

// DepositMsg component to display success message
function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      {/* Button to deposit again */}
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true); // Show deposit form
          props.setStatus(""); // Clear status message
        }}
      >
        Deposit again
      </button>
    </>
  );
}

// DepositForm component to display deposit form and handle deposit
function DepositForm(props) {
  const [amount, setAmount] = useState(""); // State to store deposit amount
  const [showBalance, setShowBalance] = useState(false); // State to show/hide balance
  const { currentUser, setCurrentUser } = useContext(UserContext); // Get current user and setCurrentUser from context
  const [email, setEmail] = useState(""); // State for email input
  const router = useRouter(); // Router instance

  // Function to handle deposit
  function handle() {
    // Check for amount, email, and amount not being zero
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    if (email !== currentUser.email && !email) {
      alert("Please enter an email for others");
      return;
    }

    if (amount == 0) {
      alert("Amount can't be zero");
      return;
    }

    // Fetch to update balance
    // Local mode
    // fetch(
    //   `http://localhost:3001/account/update/${email}/${amount}/${
    //     email === currentUser.email
    //   }`
    // )

    // Server mode
    fetch(
      `http://35.168.60.156:80/account/update/${email}/${amount}/${
        email === currentUser.email
      }`
    )
      .then((response) => response.json()) // Parse response to JSON
      .then((data) => {
        try {
          // Check if 'response' is null
          if (data.response === null) {
            alert("User not found");
            return;
          }

          props.setStatus(JSON.stringify(data.value)); // Set status
          props.setShow(false); // Hide deposit form

          // Update balance only if depositing in own account
          if (email === currentUser.email) {
            setCurrentUser((prevUser) => ({
              ...prevUser,
              balance: prevUser.balance + parseFloat(amount),
            }));

            // Check if response contains a JWT token
            if (data.token) {
              // Save new JWT token in localStorage
              localStorage.setItem("token", data.token);
            }
          }
        } catch (err) {
          props.setStatus(alert("Deposit failed")); // Show error status
          console.log("err:", err);
        }
      })
      .catch((error) => {
        console.error("Error depositing:", error);
        props.setStatus(alert("Deposit failed")); // Show error status
      });
  }

  // Effect to set email to current user's email and redirect if not logged in
  useEffect(() => {
    if (currentUser) setEmail(currentUser.email);
    if (typeof window !== "undefined" && !localStorage.getItem("token"))
      router.push("/");
  }, [currentUser, router]);

  // Return the deposit form JSX
  return (
    <>
      {/* Display balance if current user is not an admin */}
      {currentUser && currentUser.role !== "admin" && (
        <div className="row">
          <div className="col">
            <h5 style={{ color: "white" }}>
              BALANCE:{" "}
              {showBalance ? (
                <>
                  {currentUser?.balance}{" "}
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => setShowBalance(false)}
                    style={{ cursor: "pointer" }}
                  />
                </>
              ) : (
                <>
                  {currentUser?.balance.toString().replace(/\d/g, "*")}{" "}
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => setShowBalance(true)}
                    style={{ cursor: "pointer" }}
                  />
                </>
              )}
            </h5>
          </div>
        </div>
      )}
      <br />
      {/* For me radio button */}
      {currentUser && currentUser.role !== "admin" && (
        <>
          <div>
            <input
              type="radio"
              id="forMe"
              name="userType"
              value="forMe"
              checked={currentUser && email === currentUser.email}
              onChange={() => setEmail(currentUser.email)}
            />
            <label htmlFor="forMe">For me</label>
          </div>
        </>
      )}
      <div>
        {/* Radio button for selecting deposit type for others */}
        <input
          type="radio"
          id="forOthers"
          name="userType"
          value="forOthers"
          checked={currentUser && email !== currentUser.email}
          onChange={() => setEmail("")}
        />
        <label htmlFor="forOthers">For others</label>
      </div>

      {/* Input field for entering recipient email */}
      {currentUser && email !== currentUser.email && (
        <>
          <br />
          <input
            type="input"
            className="form-control"
            name="email"
            placeholder="ENTER EMAIL"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </>
      )}

      <br />
      {/* Input field for entering deposit amount */}
      <input
        type="number"
        className="form-control"
        name="amount"
        placeholder="ENTER DEPOSIT"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (parseFloat(value) < 0) {
            // If the value is negative, set it to zero
            setAmount("0");
          } else {
            // If the value is valid, update it normally
            setAmount(value);
          }
        }}
      />
      <br />
      <div className="col" style={{ textAlign: "center" }}>
        {/* Button to trigger deposit action */}
        <button
          type="submit"
          className="btn btn-light"
          onClick={handle}
          disabled={
            !amount ||
            (currentUser?.role === "admin" && !email) ||
            !email.trim() ||
            (!currentUser?.email && email !== currentUser?.email)
          }
        >
          DEPOSIT
        </button>
      </div>
    </>
  );
}
