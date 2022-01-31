import { Toaster } from "react-hot-toast";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Banner from "../components/Home/Banner";
import LogInStore from "../components/HomeStore/LogInStore";
import SignUpStore from "../components/HomeStore/SignUpStore";

const HomeStore = () => {
  return (
    <Container id="home-container">
      <Banner stores={true}></Banner>
      <LogInStore></LogInStore>
      <Divider />
      <SignUpStore></SignUpStore>
      <Toaster></Toaster>
    </Container>
  );
};

export default HomeStore;
