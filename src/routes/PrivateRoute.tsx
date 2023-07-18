/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const token = window.localStorage.getItem("token");

  const { pathname } = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
