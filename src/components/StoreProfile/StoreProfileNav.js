import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";

import "../../css/storeProfile/store-profile-nav.css";

const StoreProfileNav = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("session-store-token");
    localStorage.removeItem("store");
    navigate("/store_home", { replace: true });
  };

  return (
    <Container className="sprof-nav">
      <h1 className="sprof-title">
        <StorefrontIcon id="store-icon" className="blue-store-icon" />
        <a className="sprof-to-menu" href="/store_admin">
          ComeYa <span className="banner-store">Stores</span>
        </a>
      </h1>

      <Button
        onClick={handleLogOut}
        color="error"
        variant="contained"
        type="submit"
      >
        Log out
      </Button>
    </Container>
  );
};

export default StoreProfileNav;
