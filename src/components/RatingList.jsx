import React, { useEffect, useState } from "react";

const RatingList = ({storeId}) => {
  console.log(storeId)
  const [ratings, setRatings] = useState([]);
  const token = localStorage.getItem("authToken");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentRole=localStorage.getItem("currentRole");
  const getRatings = async () => {
    const response = await fetch(
      `http://localhost:7000/api/ratings/${currentUser.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    setRatings([...ratings, ...data]);
  };
  const getAllRatings = async () => {
    const response = await fetch(
      `http://localhost:7000/api/ratings/store/${storeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    setRatings([...ratings, ...data]);
  };
  useEffect(() => {
    if(currentRole==="User"){
     getRatings();
    }
    getAllRatings()
  }, []);
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
      </div>
      <div className="rolesTableContainer">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Store Name</th>
              <th>User name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rating.store.name}</td>
                  <td>{rating.user.name}</td>
                  <td>{rating.rating}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingList;
