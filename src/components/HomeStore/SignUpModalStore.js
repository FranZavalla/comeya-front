import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";

import { url } from "../../utils/const";

const SignUpModalStore = () => {
  const [store, setStore] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [type, setType] = useState("Restaurant");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let signUpSuccessful = true;

    try {
      await axios
        .post(url + "/signup_store", {
          store_name: store,
          password: password,
          address: address,
          phone_number: phone,
          store_type: type,
        })
        .then((res) => {
          if (res.data.auth) {
            const token = res.data.token;
            if (!localStorage.getItem("session-store-token")) {
              localStorage.setItem("session-store-token", token);
            } else {
              localStorage.removeItem("session-store-token");
              localStorage.setItem("session-store-token", token);
            }
          } else {
            signUpSuccessful = false;
            toast.error(res.data.status, { position: "top-center" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      signUpSuccessful = false;
      console.log(e);
    }

    if (signUpSuccessful) {
      const storeToken = localStorage.getItem("session-store-token");
      await axios
        .get(url + `/profile_store/${storeToken}`)
        .then((res) => {
          if (res.data.auth) {
            localStorage.setItem("store", JSON.stringify(res.data.store));
            navigate("/store_admin", { replace: true });
          } else {
            toast.error("Something wrong");
            localStorage.removeItem("session-store-token");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      localStorage.removeItem("session-store-token");
      return;
    }
  };

  return (
    <Container>
      <form id="reg-form" onSubmit={handleSubmit}>
        <FormControl className="reg-input">
          <InputLabel>Store Name</InputLabel>
          <OutlinedInput
            label="Store Name"
            onChange={(e) => setStore(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="reg-input">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="reg-input">
          <InputLabel>Address</InputLabel>
          <OutlinedInput
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="reg-input">
          <InputLabel>Phone Number</InputLabel>
          <OutlinedInput
            label="Phone Number"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="reg-input">
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

        <Button type="submit" variant="contained" color="success">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default SignUpModalStore;
