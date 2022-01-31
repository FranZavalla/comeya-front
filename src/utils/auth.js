import axios from "axios";

import { url } from "./const";

export const authUser = async (navigate, userToken) => {
  if (!userToken) {
    navigate("/home", { replace: true });
    return;
  }

  try {
    await axios
      .get(url + `/auth_user/${userToken}`)
      .then((res) => {
        if (!res.data.auth) {
          navigate("/home", { replace: true });
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    navigate("/home", { replace: true });
  }
};

export const authStore = async (navigate, storeToken) => {
  if (!storeToken) {
    navigate("/store_home", { replace: true });
    return;
  }

  try {
    await axios
      .get(url + `/auth_store/${storeToken}`)
      .then((res) => {
        if (!res.data.auth) {
          navigate("/store_home", { replace: true });
          return;
        }
      })
      .catch((e) => console.log(e));
  } catch (e) {
    navigate("/store_home", { replace: true });
  }
};
