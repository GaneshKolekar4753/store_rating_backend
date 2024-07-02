import React, { useEffect, useState } from "react";
import { useDisplay } from "../context/ComponentContext";
import AddStore from "./AddStore";
import AddRating from "./AddRating";
import { useGlobleState } from "../context/globalState";
import RatingList from "./RatingList";

const StoreList = () => {
  const { setCurrentEle } = useDisplay();
  const {setTotalStores}=useGlobleState();
  const currentRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("authToken");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState();
  const getStores = async () => {
    const response = await fetch("http://localhost:7000/api/stores/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    // console.log(data);
    setTotalStores(data.length)
    setStores([...stores, ...data]);
  };
  useEffect(() => {
    getStores();
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
        {currentRole !== "User" ? (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setCurrentEle(<AddStore />)}
          >
            Add Store
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
              <th>Store name</th>
              <th>address</th>
              <th>Avg Rating</th>
              <th>My Rating</th>
              <th>ADD/UPDATE Rating</th>
              {currentRole !== "User"? <th>See Ratings</th>:""}
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => {
              const findMyrating = () => {
                return store.ratings.find((rating, index) => {
                  return rating.user === currentUser.id;
                });
              };
              let myRating = findMyrating();

              const avgRating = () => {
                const sum = store.ratings.reduce((acc, curr) => acc + curr.rating, 0);
                return sum/store.ratings.length
              };
              let avg = avgRating();
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{avg?avg.toFixed(1):0.0}</td>
                  <td>{myRating ? myRating.rating : 0}</td>
                  <td>
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={() =>
                        setCurrentEle(
                          <AddRating
                            storeId={store._id}
                            rating={rating}
                            setRating={setRating}
                          />
                        )
                      }
                    >
                      Add/update
                    </button>
                  </td>
                  {currentRole !== "User" ? <td>
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      onClick={() =>
                        setCurrentEle(
                          <RatingList storeId={store._id}/>
                        )
                      }
                    >
                      See Ratings
                    </button>
                  </td>:""}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreList;
