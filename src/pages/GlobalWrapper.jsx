import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for styles

export const GlobalWrapper = () => {
  

  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};
