import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { orderActions } from "../store/index";

import styles from "./Styles.module.css";

const UserDetails = (props) => {
  const dispatch = useDispatch();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const firstNameInputHandler = (e) => {
    setEnteredFirstName(e.target.value);
  };

  const lastNameInputHandler = (e) => {
    setEnteredLastName(e.target.value);
  };

  const emailInputHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const validityHandler = () => {
    if (
      enteredFirstName.trim().length !== 0 &&
      enteredLastName.trim().length !== 0 &&
      enteredEmail.match(validRegex)
    ) {
      setFormIsValid(true);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      dispatch(
        orderActions.updateUserInfo({
          firstName: enteredFirstName,
          lastName: enteredLastName,
          email: enteredEmail,
        })
      );
      props.nextPage();
    }
  };

  return (
    <div>
      <h2 className={styles["form__container-header"]}>Enter your details</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          <input
            className={styles["user__input-details"]}
            type="text"
            placeholder="First name"
            onChange={firstNameInputHandler}
          />
        </div>
        <div>
          <input
            className={styles["user__input-details"]}
            type="text"
            placeholder="Last name"
            onChange={lastNameInputHandler}
          />
        </div>
        <div>
          <input
            className={styles["user__input-details"]}
            type="email"
            placeholder="E-mail"
            onChange={emailInputHandler}
          />
        </div>
        <button onClick={validityHandler} className={styles["button-submit"]}>
          Next
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
