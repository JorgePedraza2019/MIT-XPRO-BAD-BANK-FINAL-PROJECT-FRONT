import { useRouter } from "next/router"; // Importing useRouter from Next.js for routing
import React, { useState, useEffect, useContext } from "react"; // Importing necessary hooks from React
import { UserContext } from "../../contexts/UserContextProvider"; // Importing UserContext from context
import Card from "../../components/Card"; // Importing Card component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon for icons
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Importing eye and eye-slash icons

export default function Withdraw() {
  const [show, setShow] = useState(true); // State to control the visibility of the form
  const [status, setStatus] = useState(""); // State to manage the status message

  return (
    <>
      <br />
      <h4 style={{ paddingLeft: "20px", paddingTop: "20px" }}>WITHDRAW</h4>
      <Card
        bgcolor="success"
        status={status}
        body={
          show ? (
            <WithdrawForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <WithdrawMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </>
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [amount, setAmount] = useState(""); // State for managing the withdrawal amount
  const [showBalance, setShowBalance] = useState(false); // State to control the visibility of the balance
  const { currentUser, setCurrentUser } = useContext(UserContext); // Accessing currentUser and setCurrentUser from context
  const [email, setEmail] = useState(""); // State for managing the email input
  const router = useRouter(); // Accessing useRouter for routing

  function handle() {
    if (parseFloat(amount) > currentUser.balance) {
      alert("Withdrawal amount exceeds balance.");
      return;
    }

    if (amount == 0) {
      alert("Amount can't be zero");
      return;
    }

    // Local mode
    // fetch(
    //   `http://localhost:3001/account/update/${email}/-${amount}/${
    //     email === currentUser.email
    //   }`
    // )

    // Server mode
    fetch(
      `http://35.168.60.156:80/account/update/${email}/-${amount}/${
        email === currentUser.email
      }`
    )
      .then((response) => response.json()) // Parsing the response to JSON
      .then((data) => {
        try {
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);

          // Check if depositing into your own account
          if (email === currentUser.email) {
            // Update balance only if depositing into your own account
            setCurrentUser((prevUser) => ({
              ...prevUser,
              balance: prevUser.balance - parseFloat(amount),
            }));

            // Check if the response contains a JWT token
            if (data.token) {
              // Save the new JWT token to localStorage
              localStorage.setItem("token", data.token);
            }
          }
        } catch (err) {
          props.setStatus(alert("Deposit failed"));
          console.log("err:", err);
        }
      })
      .catch((error) => {
        console.error("Error depositing:", error);
        props.setStatus(alert("Deposit failed"));
      });
  }

  useEffect(() => {
    if (currentUser && currentUser.role !== "admin")
      setEmail(currentUser.email);
    if (typeof window !== "undefined" && !localStorage.getItem("token"))
      router.push("/");
  }, [currentUser, router]);

  return (
    <>
      {/* Display balance only for non-admin users */}
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
      {/* Display email input only for admin users */}
      {currentUser && currentUser.role === "admin" && (
        <>
          <input
            type="input"
            className="form-control"
            name="email"
            placeholder="ENTER EMAIL"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      <input
        type="number"
        className="form-control"
        name="amount"
        placeholder="ENTER AMOUNT"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (parseFloat(value) < 0) {
            // If the value is negative, set it to zero
            setAmount("0");
          } else {
            // If the value is valid, update normally
            setAmount(value);
          }
        }}
      />
      <br />
      <div className="col" style={{ textAlign: "center" }}>
        <button
          type="submit"
          className="btn btn-light"
          onClick={handle}
          disabled={!amount || (currentUser?.role === "admin" && !email)}
        >
          WITHDRAW
        </button>
      </div>
    </>
  );
}
