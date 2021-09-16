import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./config/routes.js";
import { AuthProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
