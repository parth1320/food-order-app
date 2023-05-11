import { useRef } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const CityInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = CityInputRef.current.value;
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type={"text"} id="name" ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type={"text"} id="street" ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="post">Postal Code</label>
        <input type={"text"} id="post" ref={postalCodeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type={"text"} id="city" ref={CityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
