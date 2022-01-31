import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import { Toaster } from "react-hot-toast";

import Navigation from "../components/Menu/Navigation";
import ProductCard from "../components/StoreMenu/ProductCard";
import StoreInfo from "../components/StoreMenu/StoreInfo";
import Cart from "../components/StoreMenu/Cart";
import Home from "./Home";

import "../css/storeMenu/store-menu.css";
import { url } from "../utils/const";
import { authUser } from "../utils/auth";

const StoreMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state;

  const user = localStorage.getItem("user");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(url + `/get_products/${name}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    localStorage.removeItem("cart");
    const userToken = localStorage.getItem("session-token");
    authUser(navigate, userToken);
    getProducts();
  }, [name, navigate]);

  if (!user) {
    return <Home />;
  }

  if (products.length === 0) {
    return (
      <Container>
        <div>
          <Navigation></Navigation>
          <Divider></Divider>
          <StoreInfo></StoreInfo>
        </div>

        <div className="menu-bottom-empty-div">
          <h1 className="menu-bottom-empty-text">
            {name} hasn't added <br /> any products yet
          </h1>
          <h3 className="menu-bottom-empty-text">Come back later please</h3>
        </div>

        <Cart id={id}></Cart>

        <Toaster></Toaster>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <Navigation></Navigation>
        <Divider></Divider>
        <StoreInfo></StoreInfo>
      </div>

      <div className="menu-bottom-div">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      <Cart id={id}></Cart>

      <Toaster></Toaster>
    </Container>
  );
};

export default StoreMenu;
