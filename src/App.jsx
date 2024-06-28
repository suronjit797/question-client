import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { routes } from "./routes/Routes";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const { token, isLogin, user } = useSelector((state) => state.auth);
  // set axios default auth token
  axios.defaults.headers.common["Authorization"] = token;

  // net error
  useEffect(() => {
    if (!navigator.onLine) {
      Swal.fire({
        icon: "error",
        title: "No Internet Connection!",
        text: "Please make sure your internet connection on and try again",
        confirmButtonText: "Try again",
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <div className="">
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <RouterProvider router={routes}></RouterProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
