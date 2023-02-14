import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./Styles.module.css";
import { orderActions } from "../store";

const schema = z.object({
  packageSelection: z.string(),
});

const Packages = (props) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const dispatch = useDispatch();
  const packageArr = useSelector((state) => state.packages);
  const { locale } = useSelector((state) => state.locale);

  const dataUpdateHandle = (formValues) => {
    const selectedPackageObj = packageArr.find(
      (item) => formValues.packageSelection === item.id
    );
    dispatch(
      orderActions.updatePackage({
        packageId: formValues.packageSelection,
        amount: selectedPackageObj.price.amount,
      })
    );
    props.nextPage();
  };

  return (
    <div>
      <h2 className={styles["form__container-header"]}>Select a package</h2>
      <form onSubmit={handleSubmit(dataUpdateHandle)}>
        {packageArr.map((item, index) => {
          return (
            <div key={item.id} className={styles.form__content}>
              <div>
                <label htmlFor={item.id}>
                  <input
                    type="radio"
                    id={item.id}
                    name="packageSelection"
                    value={item.id}
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
                  <span className={styles["package__price-old"]}>
                    {(packageArr[0].price.amount * (index + 1)).toLocaleString(
                      locale
                    )}
                    €
                  </span>
                )}
                <span className={styles.package__price}>
                  {item.price.amount.toLocaleString(locale)}€
                </span>
              </div>
            </div>
          );
        })}
        {errors.packageSelection && (
          <p className={styles["form-error"]}>Please select a package</p>
        )}
        <button className={styles["button-submit"]}>Next</button>
      </form>
    </div>
  );
};

export default Packages;
