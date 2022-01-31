import { Toaster } from "react-hot-toast";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Banner from "../components/Home/Banner";
import LogIn from "../components/Home/Login";
import SignUp from "../components/Home/Signup";

import "../css/home/home.css";

const Home = () => {
  return (
    <Container id="home-container">
      <Banner></Banner>
      <LogIn></LogIn>
      <Divider />
      <SignUp></SignUp>
      <Toaster></Toaster>
    </Container>
  );
};

export default Home;
