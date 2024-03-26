import { useRouter } from "next/router"; // Importing useRouter from Next.js for routing
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";

export default function AllData() {
  const [data, setData] = useState([]); // State for storing user data
  const [passwordVisible, setPasswordVisible] = useState([]); // State for password visibility
  const { currentUser } = useContext(UserContext); // Accessing user context
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // State for the number of rows per page
  const indexOfLastRow = currentPage * rowsPerPage; // Calculate index of last row
  const indexOfFirstRow = indexOfLastRow - rowsPerPage; // Calculate index of first row
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow); // Get current rows based on pagination
  const [filterValue, setFilterValue] = useState(""); // State for the name filter
  const router = useRouter(); // Accessing useRouter for routing

  // Function to handle the change in the number of rows per page
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset current page to first when changing rows per page
  };

  const handlePasswordVisibility = (index) => {
    setPasswordVisible((prev) =>
      prev.map((value, idx) => (idx === index ? !value : value))
    );
  };

  // Options for the number of rows per page
  const rowsPerPageOptions = [5, 10, 20];

  // Filter data based on name
  const filteredData = data.filter((obj) =>
    obj.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  useEffect(() => {
    // Fetch data only if user is logged in and not a customer
    if (
      localStorage.getItem("token") &&
      currentUser &&
      currentUser.role !== "customer"
    ) {
      async function fetchData() {
        // Local mode
        // const response = await fetch("http://localhost:3001/account/all");

        // Server mode
        const response = await fetch("http://35.168.60.156:80/account/all");
        const newData = await response.json();
        setData(newData);
        setPasswordVisible(newData.map(() => false)); // Initialize password visibility state
      }
      fetchData();
    }
    if (typeof window !== "undefined" && !localStorage.getItem("token"))
    router.push("/");
}, [currentUser, router]);

  return (
    <>
      <br />
      <h4 style={{ marginTop: "20px", marginLeft: "20px" }}>ALL DATA</h4>
      <br />
      {/* Input for filtering data by name */}
      <input
        type="text"
        placeholder="Filter by name..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        style={{ marginLeft: "20px", marginBottom: "20px" }}
      />
      <div style={{ maxWidth: "98%", margin: "0 auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">EMAIL</th>
              <th scope="col">NAME</th>
              <th scope="col">PASSWORD</th>
              <th scope="col">BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {/* Render table rows */}
            {filteredData
              .slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage)
              .map((obj, index) => (
                <tr key={obj.email}>
                  <th>{indexOfFirstRow + index + 1}</th>
                  <td>{obj.email}</td>
                  <td>{obj.name}</td>
                  <td style={{ minWidth: "650px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Icon to toggle password visibility */}
                      <span
                        style={{ marginRight: "5px", cursor: "pointer" }}
                        onClick={() => handlePasswordVisibility(index)}
                      >
                        <FontAwesomeIcon
                          icon={passwordVisible[index] ? faEyeSlash : faEye}
                        />
                      </span>
                      {/* Show password or mask it */}
                      {passwordVisible[index] ? obj.password : "*****"}
                    </div>
                  </td>
                  <td>{obj.balance}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Pagination component */}
        <Pagination>
          {[...Array(Math.ceil(data.length / rowsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
      <div style={{ marginLeft: "20px" }}>
        Rows per page:{" "}
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
