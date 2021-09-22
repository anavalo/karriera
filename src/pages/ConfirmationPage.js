import React from "react";
import Check from "../commons/Check";

const Confirmation = ({ setConfirmation }) => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-200 fixed top-0 overflow-scroll flex flex-col justify-center items-center">
        <Check/>
        <div>you applied succesfully</div>
        <button onClick={() => setConfirmation(false)}>back to jobs</button>
      </div>
    </>
  );
};

export default Confirmation;
