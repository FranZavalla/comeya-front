import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";

import "../../css/menu/navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container className="nav-container">
      <h1 className="nav-title">
        <a className="nav-to-menu" href="/menu">
          ComeYa
        </a>
      </h1>
      <div
        className="nav-profile"
        style={{ backgroundColor: user.color }}
        onClick={() => navigate("/profile", { replace: true })}
      >
        {!user ? (
          navigate("/home", { replace: true })
        ) : !user.image ? (
          <h1>{user.name[0]}</h1>
        ) : (
          <img src={user.image} alt=""></img>
        )}
      </div>
    </Container>
  );
};

export default Navigation;
