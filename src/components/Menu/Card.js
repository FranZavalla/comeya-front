import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";

import "../../css/menu/card.css";

const Card = (props) => {
  const { name, image } = props;
  const navigate = useNavigate();

  return (
    <Container
      className="card-container"
      onClick={() => navigate(`/menu/${name}`, { replace: true })}
    >
      <img className="card-icon" src={image} alt=""></img>
      <h2 className="card-text">{name}</h2>
    </Container>
  );
};

export default Card;
