import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import styles from "./Styles.module.css";

const Confirmation = (props) => {
  const orderData = useSelector((state) => state.order);
  const packagesData = useSelector((state) => state.packages);

  console.log(packagesData);

  const reportCount = packagesData.map((item) => {
    if (orderData.packageId === item.id) {
      console.log(item.reportCount);
      return item.reportCount;
    }
  });

  return (
    <React.Fragment>
      <h2 className={styles["form__container-header"]}>Review your order</h2>
      <div className={styles.form__content}>
        <div>
          <p>Package</p>
          <p>Buyer</p>
          <p>Price</p>
          <p>VAT ({orderData.vat.rate}%)</p>
          <p className={styles.gross__amount}>Total</p>
        </div>
        <div>
          <p>
            {orderData.packageId.slice(0, 1).toUpperCase() +
              orderData.packageId.slice(1)}{" "}
            ({reportCount} {reportCount === 1 ? "report" : "reports"})
          </p>
          <p>
            {orderData.buyer.firstName} {orderData.buyer.lastName}
          </p>
          <p>{orderData.price.amount.toLocaleString("lt-LT")} €</p>
          <p>{orderData.price.vatAmount.toLocaleString("lt-LT")} €</p>
          <p className={styles.gross__amount}>
            {orderData.price.grossAmount.toLocaleString("lt-LT")} €
          </p>
        </div>
      </div>
      <button onClick={props.nextPage} className={styles["button-submit"]}>
        Complete purchase
      </button>
    </React.Fragment>
  );
};

export default Confirmation;