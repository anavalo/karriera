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
      <h4>kariera.gr</h4>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Header;
