import React from "react";
import { useDisplay } from "../context/ComponentContext";
import AdminDashBoard from "./AdminDashBoard";
import UsersList from "./UsersList";
import StoreList from "./StoreList";
import RatingList from "./RatingList";
import MainContainer from "./MainContainer";
import StoreDashBoard from "./StoreDashBoard";

const SideBar = () => {
  const { setCurrentEle } = useDisplay();
  const role = localStorage.getItem("userRole");
  const handleDisplay = (Ele) => {
    setCurrentEle(Ele);
  };
  return (
    <div className="sideBarContainer">
      <div
        className="sideItem"
        onClick={() => {
          switch (role) {
            case "Admin":
              return handleDisplay(<AdminDashBoard />);
            case "Owner":
              return handleDisplay(<StoreDashBoard/>);
            case "User":
              return handleDisplay(<StoreList />);
              default:
                return handleDisplay(<MainContainer />)
          }
        }}
      >
        <p>Dashboard</p>
      </div>
      {role==="Admin"?<div className="sideItem" onClick={() => handleDisplay(<UsersList />)}>
        <p>Users</p>
      </div>:""}
      
      {role==="Admin" || role==="Owner"?<><div className="sideItem" onClick={() => handleDisplay(<StoreList />)}>
        <p>Stores</p>
      </div>
      </>:""}
    </div>
  );
};

export default SideBar;
