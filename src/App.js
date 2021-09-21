import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
// import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Layout/Header";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Switch>
        {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} /> */}
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
