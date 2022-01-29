import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// will remove later
import { useUserContext } from "../context/user_context";

// Using the Rest Parameter to collect rest of the values from Vanilla JavaScript to get all the parameters
const PrivateRoute = ({ children, ...rest }) => {
  // console.log(children);
  // console.log(rest);
  const { myUser } = useUserContext();

  // Here using the SPREAD OPERATOR
  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
