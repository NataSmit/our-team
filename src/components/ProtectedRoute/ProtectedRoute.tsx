import React from "react";
import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
  loggedin: boolean,
  children: React.ReactNode,
  path: string,
  exact: boolean
}

export default function ProtectedRoute({ loggedin, children, ...props }: ProtectedRouteProps) {
  return (
    <Route {...props}>{loggedin ? children : <Redirect to="/login" />}</Route>
  );
}
