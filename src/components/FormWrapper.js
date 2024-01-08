import React from "react";

import styles from "./GlobalStyles.module.css";

const FormWrapper = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default FormWrapper;
