import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthDispatchContext, AuthUserContext } from "../context/UserContext";

import { getJobs } from "../services";
import { logout } from "../services";

import InfiniteScroll from "react-infinite-scroll-component";
import JobBox from "../components/Layout/JobBox";

import { filterJobs } from "../helpers/filterJobs";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, SetHasMore] = useState(true);
  const [apiTotalCount, setApiTotalCount] = useState(0);
  const [query, setQuery] = useState("");

  const dispatch = useContext(AuthDispatchContext);
  const { userDetails } = useContext(AuthUserContext);

  let history = useHistory();

  let filteredJobs = filterJobs(jobs, query);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      history.push("/");
      return;
    } else {
      const { expiresIn } = JSON.parse(localStorage.getItem("token"));
      const isTokenExpired = Date.now() >= new Date(expiresIn);
      if (isTokenExpired) {
        logout(dispatch);
        history.push("/");
        return;
      }
    }

    const data = getJobs(page);
    setPage((page) => page + 1);
    data.then((data) => {
      setJobs(data.items);
      setApiTotalCount(data.totalCount);
    });
  }, []);

  const handleMoreJobs = () => {
    if (jobs.length >= apiTotalCount) {
      SetHasMore(false);
      return;
    }
    let newJobs = getJobs(page);
    newJobs.then((newJobs) => setJobs([...jobs, ...newJobs.items]));
    setPage((page) => page + 1);
  };
  const loader = query.length > 0 ? null : <h4> Loading... </h4>;
  return (
    <>
      <div className="p-5">
        <div>
          <div className="pb-1">Hello</div>
          <div className="text-xl pb-2">{userDetails.email}</div>
          <div className="border-black border-b-2 pb-1"></div>
          <div className="pb-1 pt-3">search for a job</div>
          <input
            placeholder="search.."
            type="text"
            id="query"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            className="bg-gray-200 appearance-none border w-full py-2 px-4 text-gray-700 leading-tight"
          />
          <div className="font-bold text-xl pb-2 pt-2">
            Showing {(page - 1) * 5} of {apiTotalCount} results
          </div>
        </div>
        <InfiniteScroll
          dataLength={jobs.length}
          next={handleMoreJobs}
          hasMore={hasMore}
          loader={loader}
          endMessage={<b>Yay! You have seen it all</b>}
        >
          <div className="flex flex-col items-center">
            {jobs && filteredJobs.map((x, i) => <JobBox data={x} key={i} />)}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Dashboard;
