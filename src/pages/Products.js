import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import { Toaster } from "react-hot-toast";

import BannerStore from "../components/StoreAdmin/BannerStore";
import ProductAdminCard from "../components/Products/ProductAdminCard";
import HomeStore from "../pages/HomeStore";

import "../css/products/products.css";
import { authStore } from "../utils/auth";
import { url } from "../utils/const";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("store"));
    const getProducts = async () => {
      try {
        await axios
          .get(url + `/get_products/${store.store_name}`)
          .then((res) => {
            setProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (e) {
        navigate("/store_home", { replace: true });
      }
    };

    const storeToken = localStorage.getItem("session-store-token");
    authStore(navigate, storeToken);
    getProducts();
  }, [navigate]);

  const store = JSON.parse(localStorage.getItem("store"));
  if (!store) return <HomeStore />;

  if (products.length === 0) {
    return (
      <Container>
        <BannerStore></BannerStore>
        <Container>
          <div className="product-container-empty">
            <h1 className="product-text-empty">
              You haven't added <br /> any products to your store...
            </h1>
            <h3 className="product-text-empty">
              You can add products{" "}
              <a className="empty-link" href="/store_admin">
                HERE
              </a>
              , <br />
              from the new product button
            </h3>
          </div>
        </Container>
        <Toaster></Toaster>
      </Container>
    );
  }

  return (
    <Container>
      <BannerStore></BannerStore>
      <Container>
        <div className="product-container">
          {products.map((prod) => (
            <ProductAdminCard key={prod.id} prod={prod}></ProductAdminCard>
          ))}
        </div>
      </Container>
      <Toaster></Toaster>
    </Container>
  );
};

export default Products;
