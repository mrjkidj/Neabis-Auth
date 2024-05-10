import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "./Redux/store.js";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ToastContainer 
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // className="bg-red-500 rounded-md p-4" 
      toastClassName="bg-red-500 text-white rounded-md p-4"  />

      <App />
    </BrowserRouter>
  </Provider>
);
