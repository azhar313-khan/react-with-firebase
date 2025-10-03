import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigation } from "../../interface";

export default function AuthRouter() {
  const isLoggedIn = useSelector(
    (state: Navigation) => state?.authStore?.isLoggedIn
  );

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
