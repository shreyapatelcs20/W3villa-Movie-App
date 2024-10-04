import { useState, useEffect } from "react";
import "./style.css";

function Header() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = "Eve Holt"; 
    const userLoggedIn = true;

    if (userLoggedIn) {
      setUserName(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []); 
  const handleLogout = () => {
    setUserName("");
    setIsLoggedIn(false);
    window.location.href = "/login"; 
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>Reelify</h2>
      </div>
      <div className="navbar-user">
        {isLoggedIn ? (
          <div  style={{ display: "flex", width:"250px"}}>
            <span style={{paddingTop:"0.5rem"}}>Welcome, {userName}!</span>
            <button
              className="button-20"
              style={{ width: "44%"}}
              role="button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <span>Please Log In</span>
        )}
      </div>
    </div>
  );
}

export default Header;
