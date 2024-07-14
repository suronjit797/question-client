import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import axios from "axios";

// axios base url
// axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.baseURL = "https://question-server-jm21.onrender.com/api/v1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
