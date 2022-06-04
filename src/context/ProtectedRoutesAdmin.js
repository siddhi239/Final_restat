import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoutesAdmin = ({ children }) => {
  const { user } = useUserAuth();

  //console.log("Check user in Private: ", user);
  if (!user.email === "admin@gmail.com" && !user.password === "admin123") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutesAdmin;