import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { AuthDispatchContext } from "../../context/UserContext";

import { logout } from "../../services";

const Header = () => {
  const dispatch = useContext(AuthDispatchContext);
  let history = useHistory();

  const handleLogout = () => {
    logout(dispatch);
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  return (
    <>
      <div className="container h-11 flex justify-between items-center bg-gray-400">
        <Link to="/dashboard">
          <div className="ml-4">kariera.gr</div>
        </Link>

        <button className="mr-4" onClick={handleLogout}>
          logout
        </button>
      </div>
    </>
  );
};

export default Header;
