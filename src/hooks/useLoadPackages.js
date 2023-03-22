import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { packagesActions } from "../store/packagesSlice";

const fetchPackages = () => {
  return axios.get(
    "https://run.mocky.io/v3/d6338d9d-a4ce-4054-9781-c0f0cfe2392d"
  );
};

const useLoadPackages = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
    onSuccess: (data) => dispatch(packagesActions.loadPackages(data.data)),
  });
};

export default useLoadPackages;
