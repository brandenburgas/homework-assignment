import { configureStore } from "@reduxjs/toolkit";

import { orderSlice } from "./orderSlice";
import { packageSlice } from "./packagesSlice";

const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
    packages: packageSlice.reducer,
  },
});

export default store;
