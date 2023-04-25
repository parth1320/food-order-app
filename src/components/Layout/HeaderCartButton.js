import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const totalCartItem = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
