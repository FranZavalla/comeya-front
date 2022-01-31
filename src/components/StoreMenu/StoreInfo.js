import { useLocation } from "react-router-dom";

import Container from "@mui/material/Container";

import StarRatings from "react-star-ratings";

import "../../css/storeMenu/store-info.css";

const StoreInfo = () => {
  const location = useLocation();
  const { name, address, phone, rating } = location.state;

  return (
    <Container className="store-info-container">
      <h2 className="menu-name">{name}</h2>
      <p className="menu-desc">
        {address} - {phone}
      </p>
      <div className="menu-rating-star">
        <h2 className="menu-rating">{Math.round(rating)}</h2>
        <StarRatings
          rating={rating}
          starHoverColor="rgb(255, 220, 0)"
          starRatedColor="rgb(255, 220, 0)"
          starDimension="35px"
          starSpacing="2px"
          numberOfStars={1}
        />
      </div>
    </Container>
  );
};

export default StoreInfo;
