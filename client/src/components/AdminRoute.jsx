import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "./contexts/UserContext";

const AdminRoute = ({render, ...rest}) => {
  const {user} = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        user.token && user.role === "admin" ? (
          render(props)
        ) : (
          <Redirect to="/films" />
        )
      }
    />
  );
};
export default AdminRoute;
