import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import SignUpModal from "./SignUpModal";

import "../../css/home/signup.css";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container id="signup-container">
      <Button color="secondary" onClick={handleOpen} variant="contained">
        Sign up
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="signup-box">
          <div className="signup-close">
            <Button onClick={handleClose} variant="contained" color="error">
              <CloseIcon />
            </Button>
          </div>
          <SignUpModal></SignUpModal>
        </Box>
      </Modal>
    </Container>
  );
};

export default SignUp;
