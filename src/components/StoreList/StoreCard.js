import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Container from "@mui/material/Container";
import StarRatings from "react-star-ratings";

import "../../css/storeList/store-card.css";
import { url } from "../../utils/const";

const StoreCard = (props) => {
  const { store } = props;
  const navigate = useNavigate();

  const [rating, setRating] = useState(store.rating);

  const userToken = localStorage.getItem("session-token");

  const handleClick = () => {
    navigate(`/menu/orders`, {
      state: {
        id: store.id,
        name: store.store_name,
        address: store.address,
        phone: store.phone_number,
        rating: store.rating,
      },
      replace: true,
    });
  };

  const handleVote = async (newRating) => {
    await axios
      .post(
        url + `/store_vote/${store.id}`,
        {
          rating: newRating,
        },
        { headers: { "x-access-token": userToken } }
      )
      .then((res) => {
        setRating(res.data.rating);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <div className="store-card">
        <div className="store-data" onClick={handleClick}>
          <div className="store-photo" style={{ backgroundColor: store.color }}>
            <h1>{store.store_name[0]}</h1>
          </div>
          <p className="store-name">{store.store_name}</p>
          <p className="store-desc">
            {store.address} - {store.phone_number}
          </p>
        </div>

        <div className="store-rating-star">
          <StarRatings
            rating={rating}
            changeRating={handleVote}
            starHoverColor="rgb(255, 220, 0)"
            starRatedColor="rgb(255, 220, 0)"
            starDimension="35px"
            starSpacing="2px"
          />
        </div>
      </div>
    </Container>
  );
};

export default StoreCard;
