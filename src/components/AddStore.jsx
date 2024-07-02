import React, { useState } from "react";
import { useDisplay } from "../context/ComponentContext";
import StoreList from "./StoreList";

const AddStore = () => {
  const { setCurrentEle } = useDisplay();
  const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  // console.log(currentUser)
  const token=localStorage.getItem('authToken');
  const [store, setStore] = useState({
    name: "",
    email: "",
    address: "",
  });



  const handleSave = async (e) => {
    // console.log("currentUser",currentUser);
    const response = await fetch(`http://localhost:7000/api/stores/addstore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token
        },
        body: JSON.stringify({
          name: store.name,
          email: store.email,
          address: store.address,
          owner: currentUser.id,
        }),
      });
      const json = await response.json();
      if (!json.success) {
        alert(json.msg);
      }
      if (json.success) {
        setStore({ name: "", email: "", address: ""});
        setCurrentEle(<StoreList/>);
      }
  };
  const onchange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };
  return (
    <div className="displayContainer addContainer">
      <div className="titleContainer">
        <h2>Add store</h2>
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
            value={store.name}
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
            value={store.email}
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
            value={store.address}
            onChange={onchange}
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

export default AddStore;
