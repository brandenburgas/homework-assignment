import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { orderActions } from "../store/orderSlice";

const fetchVATRates = () => {
  return axios.get(
    "https://run.mocky.io/v3/208cbd1e-0d11-4b3e-b54e-5f17a2b46012"
  );
};

const useLoadVATRates = () => {
  const countryCode = useSelector((state) => state.order.vat.countryCode);
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["vat"],
    queryFn: fetchVATRates,
    onSuccess: (data) => {
      const vatRate = data.data.find(
        (item) => item.countryCode === countryCode
      )?.rate;
      console.log(vatRate);
      dispatch(orderActions.updateVAT(vatRate));
    },
  });
};

export default useLoadVATRates;
