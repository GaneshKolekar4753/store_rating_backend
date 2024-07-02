import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userDetials, setuserDetails] = useState({ email: "", password: "" });
  let navigate = useNavigate();


  //create function to handle submit form
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:7000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userDetials.email,
        password: userDetials.password,
      }),
    });
    const json = await response.json();
    console.log(json.user);
    console.log(json);
    if (!json.success) {
      alert(json.msg);
    }
    if (json.success) {
      localStorage.setItem("authToken", json.token);
      localStorage.setItem("currentUser",JSON.stringify(json.user));
      localStorage.setItem("userRole", json.user.role);
      setuserDetails({ email: "", password: "" });
      //if logged in then navigate to home page
      navigate("/");
    }
  };

  const onchange = (e) => {
    setuserDetails({ ...userDetials, [e.target.name]: e.target.value });
  };

  return (
    <div className="logincontainer">
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onchange}
            value={userDetials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={userDetials.password}
            onChange={onchange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
        <p>Don't have an Account?<Link to={"/signup"}>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
