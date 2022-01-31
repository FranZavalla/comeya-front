import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import StorefrontIcon from "@mui/icons-material/Storefront";

import "../../css/storeAdmin/banner-store.css";

const BannerStore = () => {
  const navigate = useNavigate();
  const store = JSON.parse(localStorage.getItem("store"));

  return (
    <Container className="banner-container">
      <h1 className="banner-title">
        <StorefrontIcon id="store-icon" className="blue-store-icon" />
        <a className="banner-to-admin" href="/store_admin">
          ComeYa <span className="banner-store">Stores</span>
        </a>
      </h1>

      <div
        className="banner-store-profile"
        style={{ backgroundColor: store.color }}
        onClick={() => navigate("/store_profile", { replace: true })}
      >
        {!store ? (
          navigate("/store_home", { replace: true })
        ) : !store.image ? (
          <h1>{store.store_name[0]}</h1>
        ) : (
          <img src={store.image} alt=""></img>
        )}
      </div>
    </Container>
  );
};

export default BannerStore;
