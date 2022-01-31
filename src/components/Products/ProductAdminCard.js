import axios from "axios";
import { useState } from "react";

import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";

import EditProdModal from "./EditProdModal";

import "../../css/products/product-admin-card.css";
import { url } from "../../utils/const";

const ProductAdminCard = (props) => {
  const { prod } = props;

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    localStorage.removeItem("id");
  };

  const storeToken = localStorage.getItem("session-store-token");

  const handleEdit = async (event) => {
    let element = event.target;
    while (!element.id) {
      element = element.parentNode;
    }
    localStorage.setItem("id", element.id);
    handleOpenEdit();
  };

  const handleDelete = async (event) => {
    let element = event.target;
    while (!element.id) {
      element = element.parentNode;
    }

    await axios
      .put(
        url + "/del_product",
        { id: element.id },
        { headers: { "x-access-token": storeToken } }
      )
      .then((res) => {
        toast.success(res.data.status);
        setTimeout(() => window.location.reload(false), 1000);
      });
  };

  return (
    <Container>
      <div className="product-card" id={prod.id}>
        <div className="product-info">
          <h2>{prod.product_name}</h2>
          <p>{prod.description}</p>
        </div>

        <div className="product-price">
          <h3>${prod.price}</h3>
        </div>

        <div className="product-edit" onClick={handleEdit}>
          <EditIcon
            className="prod-button"
            sx={{ fontSize: 35 }}
            color="primary"
          ></EditIcon>
        </div>
        <div className="product-delete" onClick={handleDelete}>
          <DeleteIcon
            className="prod-button"
            sx={{ fontSize: 35 }}
            color="error"
          ></DeleteIcon>
        </div>
      </div>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box className="edit-box">
          <div className="edit-close">
            <Button onClick={handleCloseEdit} variant="contained" color="error">
              <CloseIcon />
            </Button>
          </div>
          <EditProdModal prod={prod} close={handleCloseEdit}></EditProdModal>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductAdminCard;
