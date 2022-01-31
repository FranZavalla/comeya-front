import axios from "axios";

import { toast } from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { url } from "../../utils/const";

const OrderCard = (props) => {
  const { order } = props;
  const storeToken = localStorage.getItem("session-store-token");

  const handleCancel = async (id, event) => {
    let element = event.target;
    while (!element.id) {
      element = element.parentNode;
    }

    await axios
      .post(
        url + "/cancel_order",
        { orderId: id },
        { headers: { "x-access-token": storeToken } }
      )
      .then((res) => {
        toast.success(res.data.status);
        element.remove();
        setTimeout(() => window.location.reload(false), 1500);
      })
      .catch((e) => toast.error(e.data.status));
  };

  const handleAccept = async (id, event) => {
    let element = event.target;
    while (!element.id) {
      element = element.parentNode;
    }

    await axios
      .post(
        url + "/accept_order",
        { orderId: id },
        { headers: { "x-access-token": storeToken } }
      )
      .then((res) => {
        toast.success(res.data.status);
        element.remove();
        setTimeout(() => window.location.reload(false), 1500);
      })
      .catch((e) => toast.error(e.data.status));
  };

  return (
    <div className="order-element" id={order.id}>
      <div className="order-user">
        <h2>
          <span className="no-bold">Client:</span> {order.username}
        </h2>
        <p className="order-address">
          {order.address ? `Address: ${order.address}` : "No address"}
        </p>
      </div>
      <div className="order-products">
        <ul>
          <b>Products:</b>
          {order.products.map((prod) => (
            <li key={prod.id}>
              <b>x{prod.quantity}</b> {prod.product_name} - {prod.description} -
              ${prod.price}
            </li>
          ))}
        </ul>
      </div>
      <h3 className="order-price">
        <b>TOTAL: ${order.total_price}</b>
      </h3>
      <div className="order-cancel">
        <CancelIcon
          color="error"
          className="order-button"
          sx={{ fontSize: 45 }}
          onClick={(e) => handleCancel(order.id, e)}
        />
      </div>
      <div className="order-accept">
        <CheckCircleIcon
          color="success"
          className="order-button"
          sx={{ fontSize: 45 }}
          onClick={(e) => handleAccept(order.id, e)}
        />
      </div>
    </div>
  );
};

export default OrderCard;
