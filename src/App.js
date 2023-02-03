import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Signup from "./components/Signup";
import { getInitialData } from "./store/order-actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialData());
  }, []);

  return (
    <div>
      <Signup />
    </div>
  );
}

export default App;
