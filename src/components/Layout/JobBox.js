import React, { useState, useEffect } from "react";
import { getJob } from "../../services";
import Modal from "./Modal";
import Confirmation from "../ConfirmationPage";

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
      <div className="w-80 h-48 bg-gray-200 my-3 flex flex-col p-4">
        <div className="flex-col">
          <div>{companyName}</div>
          <div>{title}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex-col">
            <div>Date Posted</div>
            <div>
              {creationDay}&nbsp;{creationMonth}
            </div>
          </div>
          <div className="flex-col">
            <div>Apply Until</div>
            <div>
              {validUntilDay}&nbsp;{validUntilMonth}
            </div>
          </div>
          <div className="flex-col">
            <div>Location</div>
            <div>{address}</div>
          </div>
        </div>
        <div>
          <button onClick={() => handleClick(id)}>apply now</button>
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
