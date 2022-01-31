import axios from "axios";
import { useState } from "react";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { toast } from "react-hot-toast";

import bellSound from "../../sounds/bell.mp3";
import "../../css/storeMenu/cart.css";
import { url } from "../../utils/const";

const Cart = (props) => {
  const { id } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [items, setItems] = useState([]);

  const [sound] = useSound(bellSound);
  const navigate = useNavigate();

  const userToken = localStorage.getItem("session-token");

  const handleOrder = async () => {
    const price = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await axios
      .post(
        url + "/new_order",
        {
          storeId: id,
          total_price: price,
          products: items,
        },
        {
          headers: {
            "x-access-token": userToken,
          },
        }
      )
      .then((res) => {
        toast.loading("Redirecting...", { duration: 2000 });
        toast.success(res.data.status);
        localStorage.removeItem("cart");
        setTimeout(() => navigate("/menu", { replace: true }), 2000);
      })
      .catch((e) => console.log(e));
    sound();
  };

  const showCart = () => {
    const button = document.getElementById("store-cart-button");
    const cart = document.getElementById("store-cart");

    if (open) {
      button.style.right = "0rem";
      cart.style.right = "-25rem";
      handleClose();
      return;
    }

    button.style.right = "25rem";
    cart.style.right = "0rem";
    handleOpen();

    const cartItems = JSON.parse(localStorage.getItem("cart"));
    setItems(cartItems);
  };

  if (!items) {
    return (
      <div>
        <div id="store-cart-button" onClick={showCart}>
          <ArrowLeftIcon sx={{ fontSize: 30 }}></ArrowLeftIcon>
          <ShoppingBasketIcon sx={{ fontSize: 30 }}></ShoppingBasketIcon>
        </div>
        <div id="store-cart">
          <div className="cart-empty">
            <h2>
              You haven't <br />
              added products <br />
              to the cart yet...
            </h2>
            <ShoppingBasketIcon sx={{ fontSize: 30 }}></ShoppingBasketIcon>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div id="store-cart-button" onClick={showCart}>
        <ArrowLeftIcon sx={{ fontSize: 30 }}></ArrowLeftIcon>
        <ShoppingBasketIcon sx={{ fontSize: 30 }}></ShoppingBasketIcon>
      </div>
      <div id="store-cart">
        {!items
          ? null
          : items.map((item) => (
              <Container key={item.id}>
                <div className="cart-item">
                  <p className="cart-item-desc">
                    <b>x{item.quantity}</b> - {item.product_name}{" "}
                    {item.description ? " - " + item.description : ""}
                  </p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
              </Container>
            ))}
        {!items ? null : (
          <Container>
            <div className="cart-confirm">
              <div className="cart-total">
                <h3>
                  Total: $
                  {items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </h3>
              </div>
              <Button color="success" variant="contained" onClick={handleOrder}>
                Confirm
              </Button>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Cart;
