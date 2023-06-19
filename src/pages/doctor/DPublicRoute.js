import React from "react";
import { Navigate } from "react-router-dom";

export default function DPublicRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/DApplyDoctor" />;
  } else {
    return children;
  }
}
