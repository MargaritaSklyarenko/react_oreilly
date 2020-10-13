import React from 'react';
import Login from "./containers/Login/Login";
import Courses from "./containers/Courses/Courses";
import AddEdit from "./containers/AddEdit/AddEdit";
import LocalhostService from "./components/LocalhostService/LocalhostService";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import './App.css';

function App() {
  const localhostService = new LocalhostService();
  const loggedIn = localhostService.getState().isLoggedIn;
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => (
          loggedIn ? (<Courses/>) : ( <Redirect to="/login"/>) 
        )}/>
        <Route path="/login" component={Login} />
        <Route path="/courses/new" component={AddEdit} />
        <Route path="/courses" component={Courses} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
