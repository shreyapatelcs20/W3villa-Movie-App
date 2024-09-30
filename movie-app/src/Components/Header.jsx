import { useState, useEffect } from "react";
import "./style.css"; 

function Header() {
  // State to store the logged-in user's name and login status
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate a login process (replace with real authentication logic)
  useEffect(() => {
    const loggedInUser = "Eve Holt"; // This would come from the login process or API call
    const userLoggedIn = true; // Replace with real logic to check if the user is logged in

    if (userLoggedIn) {
      setUserName(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []); // Empty array ensures this runs once after component mounts

  // Log out function to clear user data and redirect to the signup page
  const handleLogout = () => {
    setUserName("");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to the signup page
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>Movie-App</h2>
      </div>
      <div className="navbar-user">
        {isLoggedIn ? (
          <div>
            <span>Welcome, {userName}!</span>
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <span>Please Log In</span>
        )}
      </div>
    </div>
  );
}

export default Header;

