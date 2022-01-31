import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import StoreProfileForm from "../components/StoreProfile/StoreProfileForm";
import StoreProfileNav from "../components/StoreProfile/StoreProfileNav";

import { authStore } from "../utils/auth";

const StoreProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storeToken = localStorage.getItem("session-store-token");
    authStore(navigate, storeToken);
  }, [navigate]);

  return (
    <Container>
      <StoreProfileNav></StoreProfileNav>
      <StoreProfileForm></StoreProfileForm>
    </Container>
  );
};

export default StoreProfile;
