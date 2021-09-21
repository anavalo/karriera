import React, { useContext } from "react";
import { logout } from "../../services";
import { AuthDispatchContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useContext(AuthDispatchContext);
  let history = useHistory();

  const handleLogout = () => {
    logout(dispatch);
    history.push("/");
  };

  return (
    <>
      <div className="container h-11 flex justify-between items-center bg-gray-400">
        <div className="ml-4">kariera.gr</div>
        <button className="mr-4" onClick={handleLogout}>logout</button>
      </div>
    </>
  );
};

export default Header;
