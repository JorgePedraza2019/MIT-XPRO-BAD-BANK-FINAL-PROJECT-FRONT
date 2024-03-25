import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export default function NavBar() {
  // Get currentUser and logoutUser from UserContext
  const { currentUser, logoutUser } = useContext(UserContext);
  // State to toggle the menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Brand */}
        <Link href="/" className="navbar-brand">
          BadBank
        </Link>
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navigation links */}
        <div className={"collapse navbar-collapse" + (isOpen ? " show" : "")}>
          <ul className="navbar-nav ms-auto">
            {/* If no currentUser, show create account and login links */}
            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link
                    href="/signup/"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Create Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login/" className="nav-link" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
              </>
            )}
            {/* If currentUser exists, show deposit, withdraw, balance, and other links */}
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link
                    href="/deposit/"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/withdraw/"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Withdraw
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/balance/"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Balance
                  </Link>
                </li>
                {/* Show AllData link for non-customer users */}
                {currentUser.role !== "customer" && (
                  <li className="nav-item">
                    <Link
                      href="/alldata/"
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      AllData
                    </Link>
                  </li>
                )}
                {/* Show user email */}
                <li className="nav-item">
                  <p className="nav-link">{currentUser.email}</p>
                </li>
                {/* Logout button */}
                <li className="nav-item">
                  <button className="nav-link" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
