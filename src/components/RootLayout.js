import { Outlet } from "react-router-dom";

import FormWrapper from "./FormWrapper";

const RootLayout = () => {
  return (
    <>
      <FormWrapper>
        <Outlet />
      </FormWrapper>
    </>
  );
};

export default RootLayout;
