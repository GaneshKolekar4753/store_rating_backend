import React, { useState } from "react";
import { useDisplay } from "../context/ComponentContext";
import UsersList from "./UsersList";

const AddUser = () => {
  const { setCurrentEle } = useDisplay();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "User",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:7000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        role: user.role,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.msg);
    }
    if (json.success) {
      localStorage.setItem("authToken", json.token);
      localStorage.setItem("userEmail", json.user.email);
      localStorage.setItem("userRole", json.user.role);
      setUser({ name: "", email: "", address: "", password: "", role: "User" });
      setCurrentEle(<UsersList/>);
    }
  };
  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="displayContainer addContainer">
      <div className="titleContainer">
        <h2>Add User</h2>
      </div>
      <div className="inputesContainer">
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="name"
            name="name"
            value={user.name}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
            name="password"
            value={user.password}
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
            placeholder="address"
            name="address"
            value={user.address}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            class="form-select"
            aria-label="Default select example"
            name="role"
            value={user.role}
            onChange={onchange}
          >
            {/* <option selected>Select Role</option> */}
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Owner">Owner</option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setCurrentEle(<UsersList />)}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-success" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUser;
