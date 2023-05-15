import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const CityInputRef = useRef();

  const isError = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = CityInputRef.current.value;

    const enteredNameIsValid = !isError(enteredName);
    const enteredStreetIsValid = !isError(enteredStreet);
    const enteredCityIsValid = !isError(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    console.log(enteredNameIsValid);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalCodeClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type={"text"} id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type={"text"} id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter valid street address!</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="post">Postal Code</label>
        <input type={"text"} id="post" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter valid postalCode (5 charcters long)!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type={"text"} id="city" ref={CityInputRef} />
        {!formInputValidity.city && <p>Please enter valid city!</p>}
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
