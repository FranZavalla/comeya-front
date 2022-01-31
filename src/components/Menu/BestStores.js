import { useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";

import StoreCard from "../StoreList/StoreCard";

import "../../css/menu/best-stores.css";
import { url } from "../../utils/const";

const BestStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getTopStores = async () => {
      axios
        .get(url + "/top_stores")
        .then((res) => {
          let allStores = res.data.stores;
          setStores(allStores.filter((store) => store.rating > 0));
          return;
        })
        .catch((e) => console.log(e));
    };

    getTopStores();
  }, []);

  if (stores.length === 0) {
    return (
      <Container>
        <h1 className="best-stores-title">Top stores</h1>
        <div className="best-stores-empty-div">
          <h1 className="best-stores-empty-text">
            Sorry... <br /> There aren't <br /> stores at this time
          </h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="best-stores-title">Top stores</h1>
      <div className="best-stores-div">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store}></StoreCard>
        ))}
      </div>
    </Container>
  );
};

export default BestStores;
