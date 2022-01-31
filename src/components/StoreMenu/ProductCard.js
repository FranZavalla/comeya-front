import Container from "@mui/material/Container";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "../../css/storeMenu/product-card.css";
import toast from "react-hot-toast";

const ProductCard = (props) => {
  const { id, product_name, description, price } = props.product;

  const handleAddProduct = () => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id, product_name, description, price, quantity: 1 }])
      );
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      let existRepeated = false;
      cart.forEach((item) => {
        if (item.id === id) {
          item.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          existRepeated = true;
          return;
        }
      });

      if (!existRepeated) {
        cart.push({ id, product_name, description, price, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
    toast.success(`${product_name} added!`);
  };

  return (
    <Container>
      <div className="product-card-container">
        <p className="product-name">{product_name}</p>
        <p className="product-desc">{description}</p>
        <p className="product-price">${price}</p>
        <AddCircleIcon
          onClick={handleAddProduct}
          sx={{ fontSize: 45 }}
          color="success"
          className="product-add"
        ></AddCircleIcon>
      </div>
    </Container>
  );
};

export default ProductCard;
