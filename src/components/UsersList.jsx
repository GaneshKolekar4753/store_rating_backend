import React, { useEffect, useState } from "react";
import { useDisplay } from "../context/ComponentContext";
import AddUser from "./AddUser.jsx";
import { useGlobleState } from "../context/globalState.js";

const UsersList = (props) => {
  const {setTotalUsers}=useGlobleState();
  const { setCurrentEle } = useDisplay();
  const currentRole = localStorage.getItem("userRole");
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch("http://localhost:7000/api/users/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data  = await response.json();
    setTotalUsers(data.length);
    setUsers([...data]);
  };
  useEffect(() => {
    getUsers();
  },[]);
  return (
    <div className="displayContainer usersList">
      <div className="searchRole">
        <p>Users</p>
        <div class="container-fluid">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              // value={query}
              // onChange={(e) => {
              //   setQuery(e.target.value);
              // }}
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        {currentRole === "Admin" ? (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setCurrentEle(<AddUser />)}
          >
            Add User
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="rolesTableContainer">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index)=>{
              return(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>)
            })}
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
