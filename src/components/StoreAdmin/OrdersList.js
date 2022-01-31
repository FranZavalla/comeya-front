import { useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";

import { Toaster } from "react-hot-toast";

import OrderCard from "./OrderCard";

import "../../css/storeAdmin/order-list.css";
import { url } from "../../utils/const";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storeToken = localStorage.getItem("session-store-token");
    const store = JSON.parse(localStorage.getItem("store"));

    const getOrders = async () => {
      await axios
        .get(url + `/get_orders/${store.store_name}`, {
          headers: {
            "x-access-token": storeToken,
          },
        })
        .then((res) => {
          setOrders(res.data.orders);
          return;
        })
        .catch((e) => console.log(e));
    };

    getOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <Container className="admin-orders">
        <div className="admin-no-orders">
          <h1 className="admin-no-orders-text">
            You don't have <br />
            any orders yet...
          </h1>
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="admin-orders">
        <div>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order}></OrderCard>
          ))}
        </div>
        <Toaster></Toaster>
      </Container>
    );
  }
};

export default OrdersList;
