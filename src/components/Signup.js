import React, { useState } from "react";
import Confirmation from "./Confirmation";
import Packages from "./Packages";
import UserDetails from "./UserDetails";
import Success from "./Success";

import styles from "./Styles.module.css";

const Signup = () => {
  const [step, setStep] = useState(0);

  const changeStepHandler = () => {
    setStep(step + 1);
  };

  const componentsList = [
    <Packages nextPage={changeStepHandler} />,
    <UserDetails nextPage={changeStepHandler} />,
    <Confirmation nextPage={changeStepHandler} />,
    <Success />,
  ];

  return <div className={styles.form__container}>{componentsList[step]}</div>;
};

export default Signup;
