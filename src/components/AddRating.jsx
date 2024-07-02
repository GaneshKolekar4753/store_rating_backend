import React, { useState } from "react";
import { useDisplay } from "../context/ComponentContext";
import StoreList from "./StoreList";

const AddRating = (props) => {
    const {storeId,setRating}=props;
    // console.log(storeId,rating,setRating,props);
  const { setCurrentEle } = useDisplay();
  const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  const token=localStorage.getItem('authToken');
  // console.log(currentUser,token);
  const[rating,setrating]=useState(0);
  

  const handleSave = async (e) => {
    // console.log("currentUser",currentUser);
    const response = await fetch(`http://localhost:7000/api/ratings/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token
        },
        body: JSON.stringify({
          store:storeId ,
          user: currentUser.id,
          rating
        }),
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.msg);
      }
      if (json.success) {
        // alert("rating addes successfully");
        setRating(rating);
        setrating(0);
        setCurrentEle(<StoreList/>);
      }
  };
  
  return (
    <div className="displayContainer addContainer">
      <div className="titleContainer">
        <h2>Add store</h2>
      </div>
      <div className="inputesContainer">
        <div className="mb-3">
          <label className="form-label">
            Rating
          </label>
          <input
            type="number"
            className="form-control"
            value={rating}
            onChange={(e)=>{setrating(e.target.value)}}
          />
        </div>
        
        
      </div>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setCurrentEle(<StoreList />)}
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

export default AddRating;
