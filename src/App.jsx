import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { routes } from "./routes/Routes";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setAuth } from "./redux/features/authSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  // set axios default auth token
  axios.defaults.headers.common["Authorization"] = token;

  // use without lazy
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error?.response?.status === 401) {
          dispatch(setAuth({ token: null, user: {} }));
          localStorage.clear();
        }
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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
    <QueryClientProvider client={queryClient}>
      <div className="">
        <ConfigProvider>
          <RouterProvider router={routes}></RouterProvider>
        </ConfigProvider>
      </div>{" "}
    </QueryClientProvider>
  );
}

export default App;
