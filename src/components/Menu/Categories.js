import Container from "@mui/material/Container";

import Card from "./Card";

import "../../css/menu/categories.css";
import restaurant from "../../img/restaurant.png";
import market from "../../img/market.png";
import candyshop from "../../img/candy-shop.png";

const Categories = () => {
  return (
    <Container>
      <div className="categories-container">
        <Card name="Restaurants" image={restaurant}></Card>
        <Card name="Markets" image={market}></Card>
        <Card name="Candy shops" image={candyshop}></Card>
      </div>
    </Container>
  );
};

export default Categories;
