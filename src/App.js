import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
// import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Layout/Header";
import Four from "./pages/FourZeroFour"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/*">
          <Four/>
        </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
