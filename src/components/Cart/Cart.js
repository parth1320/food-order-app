import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const CartItem = (
    <ul>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.88 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {CartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>43.67</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Cancel
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
