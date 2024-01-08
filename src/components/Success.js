import React, { useEffect } from "react";

import globalStyles from "./GlobalStyles.module.css";
import localStyles from "./Success.module.css";

const Success = () => {
  useEffect(() => {
    const disableBackNavigation = (event) => {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    };
    disableBackNavigation();
  }, []);

  return (
    <div className={localStyles.content}>
      <h2 className={globalStyles.header}>Purchase complete!</h2>
      <img src={require("../images/success_badge.png")} alt="Success badge" />
    </div>
  );
};

export default Success;
