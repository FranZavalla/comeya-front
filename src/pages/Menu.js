import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import Navigation from "../components/Menu/Navigation";
import Categories from "../components/Menu/Categories";
import BestStores from "../components/Menu/BestStores";
import Home from "../pages/Home";

import "../css/menu/menu.css";
import { authUser } from "../utils/auth";

const Menu = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userToken = localStorage.getItem("session-token");
    authUser(navigate, userToken);
  }, [navigate]);

  if (!user) return <Home />;

  return (
    <Container id="menu-container">
      <Navigation></Navigation>
      <Categories></Categories>
      <Divider />
      <BestStores></BestStores>
    </Container>
  );
};

export default Menu;
