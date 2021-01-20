import './App.css';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from './redux/store'

// import Test from './components/Test';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/blog/Blog';
import Dashboard from './components/Dashboard';
import PropTypes from 'prop-types';

import {
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { selectUsername } from './redux/authSlice';

function App() {

  return(
    <Provider store={store}>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/">
              <Home />
              {/* <Test /> */}
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}



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

export default App;
