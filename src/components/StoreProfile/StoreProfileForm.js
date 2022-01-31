import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import "../../css/storeProfile/store-profile-form.css";
import { url } from "../../utils/const";

const StoreProfileForm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [type, setType] = useState("Restaurant");

  const storeToken = localStorage.getItem("session-store-token");
  const store = JSON.parse(localStorage.getItem("store"));

  const handleEdit = async (event) => {
    event.preventDefault();

    await axios
      .put(
        url + "/update_store_profile",
        {
          address: address ? address : store.address,
          phone_number: phone ? phone : store.phone_number,
          image: null,
          store_type: type ? type : store.store_type,
        },
        {
          headers: {
            "x-access-token": storeToken,
          },
        }
      )
      .then((res) => {
        if (res.data.auth) {
          localStorage.removeItem("store");
          localStorage.setItem("store", JSON.stringify(res.data.store));
          toast.success(res.data.status);
        } else {
          toast.error(res.data.status);
        }
      })
      .catch((e) => {
        toast.error(e.data.status);
      });

    navigate("/store_profile", { replace: true });
  };

  return (
    <Container id="sprof-container">
      <h2 className="edit-text">Edit profile</h2>
      <form id="sprof-form" onSubmit={handleEdit}>
        <FormControl className="sprof-input">
          <InputLabel>Address</InputLabel>
          <OutlinedInput
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="sprof-input">
          <InputLabel>Phone number</InputLabel>
          <OutlinedInput
            label="Phone number"
            onChange={(e) => setPhone(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="sprof-input">
          <InputLabel disabled={true}>Image</InputLabel>
          <OutlinedInput disabled={true} label="Image"></OutlinedInput>
        </FormControl>

        <FormControl className="sprof-input">
          <InputLabel>Store Type</InputLabel>
          <Select
            label="Store Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Market">Market</MenuItem>
            <MenuItem value="Candy Shop">Candy Shop</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="success" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default StoreProfileForm;
