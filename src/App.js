import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Packages from "./components/Packages";
import RootLayout from "./components/RootLayout";
import UserDetails from "./components/UserDetails";
import Confirmation from "./components/Confirmation";
import Success from "./components/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Packages /> },
      { path: "/user-details", element: <UserDetails /> },
      {
        path: "/confirmation",
        element: <Confirmation />,
      },
      { path: "/success", element: <Success /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
