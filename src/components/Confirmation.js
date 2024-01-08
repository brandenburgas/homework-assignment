import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import globalStyles from "./GlobalStyles.module.css";
import localStyles from "./Confirmation.module.css";

import { formatAmount } from "../helpers/formatAmount";
import useLoadVATRates from "../hooks/useLoadVATRates";
import useCompleteOrder from "../hooks/useSendOrder";

const Confirmation = () => {
  useLoadVATRates();

  const navigate = useNavigate();

  const order = useSelector((state) => state.order);
  const packages = useSelector((state) => state.packages);

  const { reportCount } = packages.find((item) => order.packageId === item.id);

  const { mutate } = useCompleteOrder();

  const completeOrder = () => {
    mutate(order);
    navigate("/success");
  };

  return (
    <div>
      <h2 className={globalStyles.header}>Review your order</h2>
      <div className={globalStyles.content}>
        <div className={localStyles.column}>
          <p>Package</p>
          <p>Buyer</p>
          <p>Price</p>
          <p>VAT ({order.vat.rate}%)</p>
          <p>Total</p>
        </div>
        <div className={localStyles.column}>
          <p>
            {order.packageId.slice(0, 1).toUpperCase() +
              order.packageId.slice(1)}{" "}
            ({reportCount} {reportCount === 1 ? "report" : "reports"})
          </p>
          <p>
            {order.buyer.firstName} {order.buyer.lastName}
          </p>
          <p>{formatAmount(order.price.amount)}</p>
          <p>{formatAmount(order.price.vatAmount)}</p>
          <p>{formatAmount(order.price.grossAmount)}</p>
        </div>
      </div>
      <button onClick={completeOrder} className={globalStyles.button}>
        Complete purchase
      </button>
    </div>
  );
};

export default Confirmation;
