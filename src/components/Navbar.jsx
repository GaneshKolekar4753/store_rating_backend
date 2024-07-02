import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem("currentUser"))
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-light bg-success navbarContainer">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h2>Home</h2>
        </Link>
      </div>
      <h2>{user.name}</h2>
      <button type="button" className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
