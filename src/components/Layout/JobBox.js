import React, { useState, useEffect } from "react";

import { getJob } from "../../services";

import Modal from "./Modal";
import Confirmation from "../../pages/ConfirmationPage";

const JobBox = ({ data }) => {
  const { address, companyName, createdAt, title, validUntil, id } = data;

  const [jobDetails, setJobDetails] = useState();
  const [modal, setModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    modal && (document.body.style.overflow = "hidden");
    !modal && (document.body.style.overflow = "unset");
    confirmation && (document.body.style.overflow = "hidden");
    !confirmation && (document.body.style.overflow = "unset");
  }, [modal, confirmation]);

  const [, creationMonth, creationDay] = new Date(createdAt)
    .toDateString()
    .split(" ");
  const [, validUntilMonth, validUntilDay] = new Date(validUntil)
    .toDateString()
    .split(" ");

  const handleClick = (id) => {
    let data = getJob(id);
    data.then((data) => setJobDetails(data));
    setModal(true);
  };

  return (
    <>
      <div className="w-full h-48 bg-gray-200 my-3 flex flex-col p-4">
        <div className="flex flex-row justify-between pb-8">
          <div>{companyName}</div>
          <div className="font-bold">{title}</div>
        </div>
        <div className="flex flex-row justify-between pb-8">
          <div className="flex-col">
            <div className="text-xs">Date Posted</div>
            <div className="font-bold text-xs">
              {creationDay}&nbsp;{creationMonth}
            </div>
          </div>
          <div className="flex-col">
            <div className="text-xs">Apply Until</div>
            <div className="font-bold text-xs">
              {validUntilDay}&nbsp;{validUntilMonth}
            </div>
          </div>
          <div className="flex-col">
            <div className="text-xs">Location</div>
            <div className="font-bold text-xs">{address}</div>
          </div>
        </div>
        <div>
          <button className="w-full bg-gray-400 h-11" onClick={() => handleClick(id)}>apply now</button>
        </div>
      </div>
      {modal && jobDetails && (
        <Modal
          data={jobDetails}
          setModal={setModal}
          setConfirmation={setConfirmation}
        />
      )}
      {confirmation && <Confirmation setConfirmation={setConfirmation} />}
    </>
  );
};

export default JobBox;
