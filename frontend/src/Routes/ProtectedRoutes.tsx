import React from "react";
import { Navigate, useLocation } from "react-router";
import { useUserAuth } from "../Context/UserProvider";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedin } = useUserAuth();

  return isLoggedin() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
