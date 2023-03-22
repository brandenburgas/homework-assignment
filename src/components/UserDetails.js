import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../store/orderSlice";

import globalStyles from "./GlobalStyles.module.css";
import localStyles from "./UserDetails.module.css";

const schema = z.object({
  firstName: string().min(1, { message: "Please enter a valid first name" }),
  lastName: string().min(1, { message: "Please enter a valid last name" }),
  email: string().email({ message: "Please enter a valid email address" }),
});

const UserDetails = () => {
  const navigate = useNavigate();

  const order = useSelector((state) => state.order);

  const defaultFormValues = {
    firstName: order.buyer.firstName,
    lastName: order.buyer.lastName,
    email: order.buyer.email,
  };

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const { errors } = formState;

  const updateUserInfo = (formValues) => {
    dispatch(
      orderActions.updateUserInfo({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
      })
    );
    navigate("/confirmation");
  };

  return (
    <div>
      <h2 className={globalStyles.header}>Enter your details</h2>
      <form
        onSubmit={handleSubmit(updateUserInfo)}
        className={localStyles.content}
      >
        <div>
          <input
            {...register("firstName")}
            defaultValue={defaultFormValues.firstName}
            placeholder="First name"
          />
          {errors.firstName && (
            <p className={globalStyles.error}>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("lastName")}
            defaultValue={defaultFormValues.lastName}
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className={globalStyles.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            defaultValue={defaultFormValues.email}
            placeholder="E-mail"
          />
          {errors.email && (
            <p className={globalStyles.error}>{errors.email.message}</p>
          )}
        </div>
        <button className={globalStyles.button}>Next</button>
      </form>
    </div>
  );
};

export default UserDetails;
