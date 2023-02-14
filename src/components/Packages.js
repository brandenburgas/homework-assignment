import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Styles.module.css";
import { orderActions } from "../store";

const Packages = (props) => {
  const dispatch = useDispatch();
  const packageArr = useSelector((state) => state.packages);
  const { locale } = useSelector((state) => state.locale);
  const [checkedValue, setCheckedValue] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const radioButtonHandle = (e) => {
    setCheckedValue(e.target.value);
    setFormIsValid(true);
  };

  const selectedPackageObj = packageArr.find(
    (item) => checkedValue === item.id
  );

  const dataUpdateHandle = (e) => {
    e.preventDefault();
    if (formIsValid) {
      dispatch(
        orderActions.updatePackage({
          packageId: checkedValue,
          amount: selectedPackageObj.price.amount,
        })
      );
      props.nextPage();
    }
  };

  return (
    <div>
      <h2 className={styles["form__container-header"]}>Select a package</h2>
      <form onSubmit={dataUpdateHandle}>
        {packageArr.map((item, index) => {
          return (
            <div key={item.id} className={styles.form__content}>
              <div>
                <label htmlFor={item.id}>
                  <input
                    type="radio"
                    id={item.id}
                    name="package__selection"
                    value={item.id}
                    onChange={radioButtonHandle}
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
        <button className={styles["button-submit"]}>Next</button>
      </form>
    </div>
  );
};

export default Packages;

/* <div>
<label htmlFor="single">
  <input
    type="radio"
    id="single"
    name="package__selection"
    value="single"
    onChange={radioButtonHandle}
  />
  Single (<span>1 report</span>)
</label>
<span className="package__price">{packagePrices.single}€</span>
</div>
<div>
<input
  type="radio"
  id="double"
  name="package__selection"
  value="double"
  onChange={radioButtonHandle}
/>
<label htmlFor="double">
  Double (<span>1 report</span>)
</label>
<span className="package__price-old">
  {packagePrices.single * 2}€
</span>
<span className="package__price">{packagePrices.double}€</span>
</div> */
