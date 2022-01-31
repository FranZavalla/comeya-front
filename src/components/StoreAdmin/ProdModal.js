import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";

import "../../css/storeAdmin/buttons-store.css";
import { url } from "../../utils/const";

const ProdModal = (props) => {
  const { close } = props;

  const [product, setProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);

  const storeToken = localStorage.getItem("session-store-token");

  const handleNewProduct = async (event) => {
    event.preventDefault();

    await axios
      .post(
        url + "/new_product",
        {
          product_name: product,
          description: desc,
          price: price,
          image: null,
        },
        {
          headers: {
            "x-access-token": storeToken,
          },
        }
      )
      .then((res) => {
        if (res.data.added) {
          toast.success(res.data.status);
          close();
          return;
        }
        toast.error(res.data.status);
      })
      .catch((e) => {
        toast.error(e.data.status);
      });
  };

  return (
    <Container>
      <form id="new-form" onSubmit={handleNewProduct}>
        <FormControl className="new-input">
          <InputLabel>Product name</InputLabel>
          <OutlinedInput
            label="Product name"
            onChange={(e) => setProduct(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="new-input">
          <InputLabel>Description (short)</InputLabel>
          <OutlinedInput
            label="Description (short)"
            onChange={(e) => setDesc(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="new-input">
          <InputLabel>Price</InputLabel>
          <OutlinedInput
            type="number"
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

export default ProdModal;
