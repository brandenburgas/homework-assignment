import React from "react";

import styles from "./Styles.module.css";

const Success = () => {
  return (
    <div className={styles.order__success__screen}>
      <h2 className={styles["form__container-header"]}>Purchase complete!</h2>
      <img src={require("./success_badge.png")} alt="Success badge" />
    </div>
  );
};

export default Success;
