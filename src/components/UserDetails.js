import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

import { useDispatch } from "react-redux";
import { orderActions } from "../store/index";

import styles from "./Styles.module.css";

const schema = z.object({
  firstName: string().min(1, { message: "Please enter a valid first name" }),
  lastName: string().min(1, { message: "Please enter a valid last name" }),
  email: string().email({ message: "Please enter a valid email address" }),
});

const UserDetails = (props) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const { errors } = formState;

  const formSubmitHandler = (formValues) => {
    dispatch(
      orderActions.updateUserInfo({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
      })
    );
    props.nextPage();
  };

  return (
    <div>
      <h2 className={styles["form__container-header"]}>Enter your details</h2>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className={styles["user__input-details"]}
      >
        <div>
          <input
            {...register("firstName")}
            placeholder={
              errors.firstName ? errors.firstName.message : "First name"
            }
          />
          <p className={styles["form-error"]}>{errors.firstName?.message}</p>
        </div>
        <div>
          <input {...register("lastName")} placeholder="Last name" />
          <p className={styles["form-error"]}>{errors.lastName?.message}</p>
        </div>
        <div>
          <input {...register("email")} placeholder="E-mail" />
          <p className={styles["form-error"]}>{errors.email?.message}</p>
        </div>
        <button className={styles["button-submit"]}>Next</button>
      </form>
    </div>
  );
};

export default UserDetails;
