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
  }, []);

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
        <form>
          <div className="flex flex-col items-center container mt-11">
            <div className="flex flex-col w-80 text-sm">
              Enter your email
              <input
                type="text"
                id="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                className="bg-gray-200 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              />
            </div>
            <div className="flex flex-col w-80 mt-6 text-sm">
              Enter your password
              <input
                type="password"
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="bg-gray-200 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              />
            </div>
            <button className="mt-6 bg-gray-400 w-24 h-11" onClick={handleLogin} disabled={loading}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
