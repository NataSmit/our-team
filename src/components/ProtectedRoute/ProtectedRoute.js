import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ loggedin, children, ...props }) {
  return (
    <Route {...props}>{loggedin ? children : <Redirect to="/login" />}</Route>
  );
}
