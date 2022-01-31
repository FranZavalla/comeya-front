import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import "../../css/profile/profile-form.css";
import { url } from "../../utils/const";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const userToken = localStorage.getItem("session-token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEdit = async (event) => {
    event.preventDefault();

    await axios
      .put(
        url + "/update_profile",
        {
          name: name ? name : user.name,
          image: null,
          address: address ? address : user.address,
        },
        { headers: { "x-access-token": userToken } }
      )
      .then((res) => {
        if (res.data.auth) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success(res.data.status);
        } else {
          toast.error(res.data.status);
        }
      })
      .catch((e) => {
        toast.error(e.data.status);
      });

    navigate("/profile", { replace: true });
  };

  return (
    <Container>
      <div id="prof-container">
        <h2 className="edit-text">Edit profile</h2>
        <form id="prof-form" onSubmit={handleEdit}>
          <FormControl className="prof-input">
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              label="Name"
              onChange={(e) => setName(e.target.value)}
            ></OutlinedInput>
          </FormControl>

          <FormControl className="prof-input">
            <InputLabel disabled={true}>Image</InputLabel>
            <OutlinedInput disabled={true} label="Image"></OutlinedInput>
          </FormControl>

          <FormControl className="prof-input">
            <InputLabel>Address</InputLabel>
            <OutlinedInput
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
            ></OutlinedInput>
          </FormControl>

          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ProfileForm;
