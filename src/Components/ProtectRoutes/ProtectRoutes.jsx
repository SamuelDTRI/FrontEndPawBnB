import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRole);

  const ProtectedComponent = (props) => {
    const navigate = useNavigate();

    if (!isLoggedIn || !allowedRoles.includes(userRole)) {
      navigate("/login");
      return null;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} element={<ProtectedComponent />} />;
};

export default PrivateRoute;
