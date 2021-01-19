import './App.css';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Test from './components/Test';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/blog/Blog';
import Dashboard from './components/Dashboard';

function App() {

  return(
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
            {/* <Test /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
