import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";

import "../../css/home/banner.css";

const Banner = (props) => {
  const stores = props.stores;
  const navigate = useNavigate();

  return (
    <Container id="banner-container">
      <h1 className="banner-title">
        {stores ? (
          <div>
            <StorefrontIcon id="store-icon" className="blue-store-icon" />
            <a className="banner-to-home" href="/home">
              ComeYa <span className="nav-store">Stores</span>
            </a>
          </div>
        ) : (
          <a className="banner-to-home" href="/home">
            ComeYa
          </a>
        )}
      </h1>
      {stores ? null : (
        <Button
          onClick={() => navigate("/store_home", { replace: true })}
          className="banner-stores"
          variant="contained"
          type="submit"
        >
          <StorefrontIcon id="store-icon" />
          ComeYa Stores
        </Button>
      )}
    </Container>
  );
};

export default Banner;
