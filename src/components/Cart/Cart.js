import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [CheckoutForm, setCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderSubmitHandler = () => {
    setCheckoutForm(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modelActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Cancel
      </button>
      <button className={classes.button} onClick={orderSubmitHandler}>
        Order
      </button>
    </div>
  );

  const submitDataHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-129a6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      },
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModal = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {CheckoutForm && (
        <Checkout onConfirm={submitDataHandler} onCancel={props.onHideCart} />
      )}
      {!CheckoutForm && modelActions}
    </React.Fragment>
  );

  const cartSubmittingModal = <p>Sending Order Data...</p>;
  const didSubmitModal = (
    <React.Fragment>
      <p>Successfully sent the order...</p>
      <button className={classes.button} onClick={props.onHideCart}>
        Cancel
      </button>
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && cartSubmittingModal}
      {didSubmit && !isSubmitting && didSubmitModal}
    </Modal>
  );
};

export default Cart;
