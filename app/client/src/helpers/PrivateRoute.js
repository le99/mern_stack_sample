import React from 'react';

import {
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { selectUsername } from '../redux/authSlice';

import PropTypes from 'prop-types';

//https://reactrouter.com/web/example/auth-workflow
function PrivateRoute({ children, ...rest }) {
  const username = useSelector(selectUsername);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        username ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any
}

export default PrivateRoute;