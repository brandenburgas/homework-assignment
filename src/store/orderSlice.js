import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageId: "",
  buyer: {
    firstName: "",
    lastName: "",
    email: "",
  },
  vat: {
    countryCode: "",
    rate: "",
  },
  price: {
    currency: "",
    amount: 0,
    grossAmount: 0,
    vatAmount: 0,
  },
};

const orderSlice = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    initializeData(state, action) {
      const { countryCode, currency } = action.payload;
      state.vat = { ...state.vat, countryCode: countryCode };
      state.price.currency = currency;
    },
    updateVAT(state, action) {
      const rate = action.payload;
      state.vat = { ...state.vat, rate: rate };
      state.price = {
        ...state.price,
        grossAmount: +(state.price.amount * (state.vat.rate / 100 + 1)).toFixed(
          2
        ),
        vatAmount: +((state.price.amount * state.vat.rate) / 100).toFixed(2),
      };
    },
    updatePackage(state, action) {
      const { packageId, amount } = action.payload;
      state.packageId = packageId;

      state.price = {
        ...state.price,
        amount: amount,
      };
    },
    updateUserInfo(state, action) {
      const { firstName, lastName, email } = action.payload;
      state.buyer = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
    },
  },
});

export { orderSlice };
export const orderActions = orderSlice.actions;
