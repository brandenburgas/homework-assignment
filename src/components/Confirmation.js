import React from "react";
import { useSelector } from "react-redux";

import styles from "./Styles.module.css";
import { sendOrderData } from "../store/order-actions";

const Confirmation = (props) => {
  const orderData = useSelector((state) => state.order);
  const packagesData = useSelector((state) => state.packages);

  const reportCount = packagesData.map((item) => {
    if (orderData.packageId === item.id) return item.reportCount;
  });

  const orderCompleteHandler = () => {
    sendOrderData(orderData);
    props.nextPage();
  };

  return (
    <div>
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
      <button
        onClick={orderCompleteHandler}
        className={styles["button-submit"]}
      >
        Complete purchase
      </button>
    </div>
  );
};

export default Confirmation;
