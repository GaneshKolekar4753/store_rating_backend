import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userDetials, setuserDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });
  let navigate = useNavigate();
  console.log(userDetials.role)
  //create function to handle create user
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:7000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userDetials.name,
        email: userDetials.email,
        password: userDetials.password,
        address: userDetials.address,
        role: userDetials.role,
      }),
    });
    const json = await response.json();
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
          <label for="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="name"
            value={userDetials.name}
            onChange={onchange}
          />
        </div>
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
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="address"
            value={userDetials.address}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            class="form-select"
            aria-label="Default select example"
            name="role"
            value={userDetials.role}
            onChange={onchange}
          >
            <option selected>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Owner">Owner</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Create
        </button>
        <p>
          Already have an Account?<Link to={"/"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
