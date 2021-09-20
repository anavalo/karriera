import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Layout/Header";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Login />
        </Route>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
