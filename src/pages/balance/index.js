import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import Card from "../../components/Card";

// Balance component
export default function Balance() {
  const [show, setShow] = useState(true); // State to control showing balance form or message
  const [status, setStatus] = useState(""); // State for status message
  const { currentUser } = useContext(UserContext); // Get current user from context

  return (
    <>
      <br />
      <h4 style={{ paddingLeft: "20px", paddingTop: "20px" }}>BALANCE</h4>
      {/* Display a Card component with either BalanceForm or BalanceMsg based on 'show' state */}
      <Card
        bgcolor="info"
        status={status}
        body={
          show ? (
            <BalanceForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <BalanceMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </>
  );
}

// BalanceMsg component to display success message
function BalanceMsg(props) {
  return (
    <>
      <h5 style={{ marginBottom: "20px" }}>Success</h5>
      {/* Button to check balance again */}
      <button
        type="submit"
        className="btn btn-light"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          props.setShow(true); // Show balance form
          props.setStatus(""); // Clear status message
        }}
      >
        Check balance again
      </button>
    </>
  );
}

// BalanceForm component to display balance form and handle balance check
function BalanceForm(props) {
  const { currentUser } = useContext(UserContext); // Get current user from context
  const [balance, setBalance] = useState(""); // State to store balance
  const [email, setEmail] = useState(""); // State for email input
  const router = useRouter(); // Router instance

  // Function to handle balance check
  function handle(email) {
    // Local mode
    //fetch(`http://localhost:3001/account/findOne/${email}`)

    // Server mode
    fetch(`http://35.168.60.156:80/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const user = JSON.parse(text);
          props.setStatus(`BALANCE: ${user.balance}`); // Set balance status
          props.setShow(false); // Hide balance form
          setBalance(user.balance); // Set balance in state
        } catch (err) {
          props.setStatus(alert("The user was not found")); // Show error if user not found
          console.log("err:", err);
        }
      });
  }

  // Check if the user is a customer and fetch balance
  useEffect(() => {
    if (currentUser && currentUser.role === "customer") {
      setEmail(currentUser.email); // Set email to current user's email
      handle(currentUser.email); // Fetch balance for current user
    }
    if (typeof window !== "undefined" && !localStorage.getItem("token"))
      router.push("/"); // Redirect to home if not logged in
  }, [currentUser, router]);

  // Return the balance form JSX
  return (
    <>
      <input
        type="input"
        className="form-control"
        placeholder="EMAIL"
        value={email}
        disabled={currentUser && currentUser.role === "customer"} // Disable input for customers
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <div className="col" style={{ textAlign: "center" }}>
        {/* Button to check balance */}
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => handle(email)}
        >
          CHECK BALANCE
        </button>
      </div>
    </>
  );
}
