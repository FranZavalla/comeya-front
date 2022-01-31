import { useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";

import { url } from "../../utils/const";
import "../../css/products/edit-prod-modal.css";

const EditProdModal = (props) => {
  const { prod, close } = props;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);

  const storeToken = localStorage.getItem("session-store-token");

  const handleEdit = async (event) => {
    event.preventDefault();

    await axios
      .put(
        url + "/edit_product",
        {
          id: prod.id,
          product_name: name ? name : prod.product_name,
          description: desc ? desc : prod.description,
          price: price ? price : prod.price,
          image: null,
        },
        {
          headers: { "x-access-token": storeToken },
        }
      )
      .then((res) => {
        if (res.data.edited) {
          toast.success(res.data.status);
          close();
          setTimeout(() => window.location.reload(false), 1000);
        } else {
          toast.error(res.data.status);
        }
      })
      .catch((e) => toast.error(e.data.status));
  };

  return (
    <Container>
      <form className="edit-form" onSubmit={handleEdit}>
        <FormControl className="edit-input">
          <InputLabel>Product name</InputLabel>
          <OutlinedInput
            label="Product name"
            onChange={(e) => setName(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="edit-input">
          <InputLabel>Description</InputLabel>
          <OutlinedInput
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="edit-input">
          <InputLabel>Price</InputLabel>
          <OutlinedInput
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <Button type="submit" variant="contained" color="success">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default EditProdModal;
