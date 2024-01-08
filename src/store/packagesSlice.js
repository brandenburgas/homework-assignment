import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "packages",
  initialState: [],
  reducers: {
    loadPackages(state, action) {
      const packages = action.payload;
      for (let item of packages) {
        state.push(item);
      }
    },
  },
});

export { packageSlice };
export const packagesActions = packageSlice.actions;
