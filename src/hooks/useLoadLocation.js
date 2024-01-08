import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { orderActions } from "../store/orderSlice";

const fetchLocation = () => {
  return axios.get("http://ipapi.co/json/");
};

const useLoadLocation = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,
    onSuccess: (data) =>
      dispatch(
        orderActions.initializeData({
          countryCode: data.data.country.toLowerCase(),
          currency: data.data.currency,
        })
      ),
  });
};

export default useLoadLocation;
