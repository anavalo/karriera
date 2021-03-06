import React, { useState } from "react";
import { applyJob } from "../../services";

const Modal = ({ setModal, data, setConfirmation }) => {
  const [yearsOfExp, setYearsOfExp] = useState("");
  const [referer, setReferer] = useState("");

  const {
    address,
    companyName,
    createdAt,
    description,
    id,
    title,
    validUntil,
  } = data;

  const handleApply = (e) => {
    e.preventDefault();
    const job = applyJob(id, yearsOfExp);
    job
      .then((data) => {
        if (data.status === 200) {
          setConfirmation(true);
          setModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-full w-full bg-gray-400 fixed top-0 overflow-scroll p-4">
        <div className="flex justify-between">
          <div className="font-bold">Apply for the job</div>
          <button className="" onClick={() => setModal(false)}>
            X
          </button>
        </div>

        <div className="flex flex-row justify-between pb-8 pt-8">
          <div>{companyName}</div>
          <div className="font-bold">{title}</div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: description }} />
        <form>
          <div className="flex flex-col items-center container mt-11">
            <div className="flex flex-col w-80 text-sm">
              Years of Experience
              <input
                type="text"
                id="experience"
                value={yearsOfExp}
                onChange={({ target }) => setYearsOfExp(target.value)}
                className="bg-gray-200 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              />
            </div>
            <div className="flex flex-col w-80 mt-6 text-sm">
              Can Someone Refer you
              <input
                type="text"
                value={referer}
                onChange={({ target }) => setReferer(target.value)}
                className="bg-gray-200 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight"
              />
            </div>
            <button
              className="mt-6 bg-gray-200 w-24 h-11"
              onClick={(e) => handleApply(e)}
            >
              apply
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
