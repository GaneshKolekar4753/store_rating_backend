import React, { useState } from "react";
import UsersList from "./UsersList";
import StoreList from "./StoreList";
import RatingList from "./RatingList";
import { useDisplay } from "../context/ComponentContext";
import { useGlobleState } from "../context/globalState";

const AdminDashBoard = () => {
  const { setCurrentEle } = useDisplay();
  const {totalUsers,tolatStores,totalRatings}=useGlobleState();
  const handleDisplay = (Ele) => {
    setCurrentEle(Ele);
  };

  return (
    <div className="displayContainer adminDashboard">
      <div className="itemcard">
        <h1>Total Users</h1>
        <h1>{totalUsers}</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleDisplay(<UsersList />)}
        >
          See Users
        </button>
      </div>
      <div className="itemcard">
        <h1>Total Stores</h1>
        <h1>{tolatStores}</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleDisplay(<StoreList/>)}
        >
          See Stores
        </button>
      </div>
      <div className="itemcard">
        <h1>Total Users Subbmitted ratings</h1>
        <h1>{totalRatings}</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleDisplay(<RatingList />)}
        >
          See Ratings
        </button>
      </div>
    </div>
  );
};

export default AdminDashBoard;
