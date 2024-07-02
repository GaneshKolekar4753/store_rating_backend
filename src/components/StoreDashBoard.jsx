import React, { useEffect, useState } from "react";
import RatingList from "./RatingList";
import { useDisplay } from "../context/ComponentContext";

const StoreDashBoard = () => {
  const { setCurrentEle } = useDisplay();
  const [mystore, setMystore] = useState([]);
  const token = localStorage.getItem("authToken");

  const getMyStore = async () => {
    const response = await fetch("http://localhost:7000/api/stores/mystore", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    setMystore([...data]);
  };
  useEffect(() => {
    getMyStore();
  }, []);
  const handleDisplay = (Ele) => {
    setCurrentEle(Ele);
  };
  return (
    <div className="displayContainer storeDashboard">
      {mystore.map((store, index) => {
        const avgRating = () => {
          const sum = store.ratings.reduce((acc, curr) => acc + curr.rating, 0);
          return sum / store.ratings.length;
        };
        let avg = avgRating();
        return (
          <div key={index} className="itemcard">
            <h1>{store.name}</h1>
            <h2>{store.email}</h2>
            <p>{store.address}</p>
            <h2>{`Average rating:${avg?avg.toFixed(1):0}`} </h2>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleDisplay(<RatingList />)}
            >
              See Rating
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default StoreDashBoard;
