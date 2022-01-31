import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Container from "@mui/material/Container";

import ProfileNav from "../components/Profile/ProfileNav";
import ProfileForm from "../components/Profile/ProfileForm";

import { authUser } from "../utils/auth";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("session-token");
    authUser(navigate, userToken);
  }, [navigate]);

  return (
    <Container>
      <Toaster></Toaster>
      <ProfileNav></ProfileNav>
      <ProfileForm></ProfileForm>
    </Container>
  );
};

export default Profile;
