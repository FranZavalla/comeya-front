import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import "../../css/profile/profile-nav.css";

const ProfileNav = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("session-token");
    localStorage.removeItem("user");
    navigate("/home", { replace: true });
  };

  return (
    <Container className="prof-nav">
      <h1 className="prof-title">
        <a className="prof-to-menu" href="/menu">
          ComeYa
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

export default ProfileNav;
