import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import { Toaster } from "react-hot-toast";

import BannerStore from "../components/StoreAdmin/BannerStore";
import ButtonsStore from "../components/StoreAdmin/ButtonsStore";
import OrdersList from "../components/StoreAdmin/OrdersList";
import HomeStore from "../pages/HomeStore";

import "../css/storeAdmin/store-admin.css";
import { authStore } from "../utils/auth";

const StoreAdmin = () => {
  const navigate = useNavigate();
  const store = JSON.parse(localStorage.getItem("store"));

  useEffect(() => {
    const storeToken = localStorage.getItem("session-store-token");
    authStore(navigate, storeToken);
  }, [navigate]);

  if (!store) return <HomeStore />;

  return (
    <Container id="admin-container">
      <Toaster></Toaster>
      <BannerStore></BannerStore>
      <ButtonsStore></ButtonsStore>
      <OrdersList></OrdersList>
    </Container>
  );
};

export default StoreAdmin;
