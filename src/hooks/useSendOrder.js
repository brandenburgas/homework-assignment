import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const sendOrder = (order) => {
  return axios.post(
    "https://react-http-2156a-default-rtdb.europe-west1.firebasedatabase.app/cVhomework.json",
    order
  );
};

const useCompleteOrder = () => {
  return useMutation({
    mutationFn: sendOrder,
  });
};

export default useCompleteOrder;
