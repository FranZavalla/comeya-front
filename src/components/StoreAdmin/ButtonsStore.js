import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import ProdModal from "./ProdModal";

const ButtonsStore = () => {
  const navigate = useNavigate();

  const [openNew, setOpenNew] = useState(false);
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  return (
    <Container className="admin-buttons">
      <Button
        onClick={() => navigate("/products", { replace: true })}
        className="admin-product-button"
        variant="contained"
      >
        Products
      </Button>

      <Button
        onClick={handleOpenNew}
        className="admin-product-button"
        variant="contained"
      >
        New product
      </Button>

      <Modal open={openNew} onClose={handleCloseNew}>
        <Box className="new-box">
          <div className="new-close">
            <Button onClick={handleCloseNew} variant="contained" color="error">
              <CloseIcon />
            </Button>
          </div>
          <ProdModal close={handleCloseNew}></ProdModal>
        </Box>
      </Modal>
    </Container>
  );
};

export default ButtonsStore;
