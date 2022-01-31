import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import toast from "react-hot-toast";

import "../../css/home/login.css";
import { url } from "../../utils/const";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    let loginSuccessful = true;

    try {
      await axios
        .post(url + "/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.auth) {
            const token = res.data.token;
            if (!localStorage.getItem("session-token")) {
              localStorage.setItem("session-token", token);
            } else {
              localStorage.removeItem("session-token");
              localStorage.setItem("session-token", token);
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
      const userToken = localStorage.getItem("session-token");
      const res = await axios.get(url + `/profile/${userToken}`);

      if (res.data.auth) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/menu", { replace: true });
      } else {
        toast.error("Something wrong");
        localStorage.removeItem("session-token");
      }
    } else {
      localStorage.removeItem("session-token");
      return;
    }
  };

  return (
    <Container>
      <form id="login-form" onSubmit={handleLogin}>
        <FormControl className="log-input">
          <InputLabel>Username</InputLabel>
          <OutlinedInput
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
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

export default LogIn;
