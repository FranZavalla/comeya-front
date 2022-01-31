import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";

import Navigation from "../components/Menu/Navigation";
import StoreCard from "../components/StoreList/StoreCard";
import Home from "./Home";

import "../css/storeList/store-list.css";
import { url } from "../utils/const";
import { authUser } from "../utils/auth";

const StoreList = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    const type = window.location.pathname.split("/")[2];
    const userToken = localStorage.getItem("session-token");

    const getShops = async (store) => {
      await axios
        .get(url + `/get_store/${store}`)
        .then((res) => {
          setStores(res.data);
        })
        .catch((e) => console.log(e));
    };

    authUser(navigate, userToken);
    switch (type) {
      case "Restaurants":
        getShops("Restaurant");
        break;
      case "Markets":
        getShops("Market");
        break;
      case "Candy%20shops":
        getShops("Candy Shop");
        break;
      default:
        break;
    }
  }, [navigate]);

  if (!user) {
    return <Home />;
  }

  if (stores.length === 0) {
    return (
      <Container>
        <Navigation></Navigation>
        <Container>
          <div className="store-list-empty-div">
            <h1 className="store-list-empty-text">
              Sorry... <br /> There aren't <br /> stores at this time
            </h1>
          </div>
        </Container>
      </Container>
    );
  }

  return (
    <Container>
      <Navigation></Navigation>
      <Container>
        <div className="store-list-div">
          {stores.map((store) => (
            <div key={store.id}>
              <StoreCard store={store}></StoreCard>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default StoreList;
