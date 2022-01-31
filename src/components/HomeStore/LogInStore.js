import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import toast from "react-hot-toast";

import { url } from "../../utils/const";

const LogInStore = () => {
  const [store, setStore] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    let loginSuccessful = true;

    try {
      await axios
        .post(url + "/login_store", {
          store_name: store,
          password: password,
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
            loginSuccessful = false;
            toast.error(res.data.status, { position: "top-center" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      loginSuccessful = false;
      console.log(e);
    }

    if (loginSuccessful) {
      const storeToken = localStorage.getItem("session-store-token");
      await axios.get(url + `/profile_store/${storeToken}`).then((res) => {
        if (res.data.auth) {
          localStorage.setItem("store", JSON.stringify(res.data.store));
          navigate("/store_admin", { replace: true });
        } else {
          toast.error("Something wrong");
          localStorage.removeItem("session-store-token");
        }
      });
    } else {
      localStorage.removeItem("session-store-token");
      return;
    }
  };

  return (
    <Container>
      <form id="login-form" onSubmit={handleLogin}>
        <FormControl className="log-input">
          <InputLabel>Store name</InputLabel>
          <OutlinedInput
            label="Store name"
            onChange={(e) => setStore(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="log-input">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <Button
          color="success"
          className="log-input"
          variant="contained"
          type="submit"
        >
          Log in
        </Button>
      </form>
    </Container>
  );
};

export default LogInStore;
