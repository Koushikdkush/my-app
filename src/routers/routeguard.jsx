import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

// auth.js
const isLoggedIn = () => {
  return localStorage.getItem("user");
};



export default ProtectedRoute;
