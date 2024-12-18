import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';
import Register from './Components/Register';

import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Route protégée */}
        {/*<PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/chat" component={Chat} />*/}
      </Switch>
    </Router>
  );
}

export default App;