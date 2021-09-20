import React, { useState, useContext, useEffect } from "react";
import { loginUser } from "../../services";
import {
  AuthUserContext,
  AuthDispatchContext,
} from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const { loading } = useContext(AuthUserContext);
  const dispatch = useContext(AuthDispatchContext);
  let history = useHistory();

  useEffect(() => {
    const isAuth = localStorage.getItem("token") !== null;
    if (isAuth) {
      history.push("/dashboard");
    }
  }, [history]);

  const handleLogin = async (e) => {
    e.preventDefault();

    let payload = { email, password };

    try {
      let response = await loginUser(dispatch, payload);
      if (!response.user) return;
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form>
          <div>
            <div>
              Enter your email
              <input
                type="text"
                id="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div>
              Enter your password
              <input
                type="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>
          <button onClick={handleLogin} disabled={loading}>
            login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
