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
import PrivateRoute from './helpers/PrivateRoute';

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


export default App;
