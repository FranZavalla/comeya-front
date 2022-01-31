import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";

import "../../css/home/signUpModal.css";
import { url } from "../../utils/const";

const SignUpModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let signUpSuccessful = true;

    try {
      await axios
        .post(url + "/signup", {
          username: username,
          password: password,
          name: name,
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
      const userToken = localStorage.getItem("session-token");
      await axios
        .get(url + `/profile/${userToken}`)
        .then((res) => {
          if (res.data.auth) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/menu", { replace: true });
          } else {
            toast.error("Something wrong");
            localStorage.removeItem("session-token");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      localStorage.removeItem("session-token");
      return;
    }
  };

  return (
    <Container>
      <form id="reg-form" onSubmit={handleSubmit}>
        <FormControl className="reg-input">
          <InputLabel>Username</InputLabel>
          <OutlinedInput
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></OutlinedInput>
        </FormControl>

        <FormControl className="reg-input">
          <InputLabel>Full name</InputLabel>
          <OutlinedInput
            label="Full name"
            onChange={(e) => setName(e.target.value)}
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

        <Button type="submit" variant="contained" color="success">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default SignUpModal;
