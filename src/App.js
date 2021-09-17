import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Header from './components/Layout/Header'


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Switch>
        <Route exact path="/">
            <Login/>
        </Route>
        <Route exact path="/dashboard">
            <Dashboard/>
        </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
