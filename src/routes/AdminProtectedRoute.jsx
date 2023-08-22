import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { notify } from "../components/Toastify";

const AdminProtectedRoute = () => {
  const { isAdmin } = useAuthContext();
  if (!isAdmin) {
    notify("Only for Admin", "default");
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
