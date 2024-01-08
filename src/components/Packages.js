import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import globalStyles from "./GlobalStyles.module.css";
import localStyles from "./Packages.module.css";
import { orderActions } from "../store/orderSlice";
import { formatAmount } from "../helpers/formatAmount";
import useLoadLocation from "../hooks/useLoadLocation";
import useLoadPackages from "../hooks/useLoadPackages";

const schema = z.object({
  packageSelection: z.string(),
});

export let CURRENCY = "";

const Packages = () => {
  const { data: locationResponse } = useLoadLocation();
  const { data: packageResponse, error, isLoading } = useLoadPackages();
  const packages = packageResponse?.data;

  CURRENCY = locationResponse?.data.currency;

  const order = useSelector((state) => state.order);
  const navigate = useNavigate();

  const defaultFormValue = order.packageId;
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const dispatch = useDispatch();
  const selectPackage = (formValues) => {
    if (!error) {
      const selectedPackage = packages.find(
        (item) => formValues.packageSelection === item.id
      );
      dispatch(
        orderActions.updatePackage({
          packageId: formValues.packageSelection,
          amount: selectedPackage.price.amount,
        })
      );
      navigate("/user-details");
    }
  };

  if (isLoading) {
    return <h2 className={globalStyles.header}>Loading package data</h2>;
  }

  return (
    <div>
      {error ? (
        <h2 className={globalStyles.header}>Error! {error.message}</h2>
      ) : (
        <>
          <h2 className={globalStyles.header}>Select a package</h2>
          <form onSubmit={handleSubmit(selectPackage)}>
            {packages?.map((item, index) => {
              return (
                <div key={item.id} className={globalStyles.content}>
                  <div>
                    <label htmlFor={item.id}>
                      <input
                        type="radio"
                        id={item.id}
                        name="packageSelection"
                        value={item.id}
                        defaultChecked={item.id === defaultFormValue}
                        {...register("packageSelection")}
                      />
                      {item.title} (
                      <span>
                        {item.reportCount}{" "}
                        {item.reportCount === 1 ? "report" : "reports"}
                      </span>
                      )
                    </label>
                  </div>
                  <div>
                    {index !== 0 && (
                      <span className={localStyles.priceOld}>
                        {formatAmount(packages[0].price.amount * (index + 1))}
                      </span>
                    )}
                    <span>{formatAmount(item.price.amount)}</span>
                  </div>
                </div>
              );
            })}
            {errors.packageSelection && (
              <p className={globalStyles.error}>Please select a package</p>
            )}

            <button className={globalStyles.button}>Next</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Packages;
