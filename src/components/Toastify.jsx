import React from "react";
import { ToastContainer, toast } from "react-toastify";

export function notify(msg, type = "success") {
  return toast(msg, { type: type });
}

const Toastify = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toastify;
