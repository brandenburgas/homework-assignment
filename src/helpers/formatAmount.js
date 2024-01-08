import { CURRENCY } from "../components/Packages";

const locale = navigator.language ? navigator.language : "en-EU";

export const formatAmount = (amount) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: CURRENCY ? CURRENCY : "EUR",
  }).format(amount);
};
