import React, { useEffect, useState, useContext } from "react";
import { getJobs } from "../../services";
import { useHistory } from "react-router-dom";
import { logout } from "../../services";
import {
  AuthDispatchContext,
  AuthUserContext,
} from "../../context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import JobBox from "../../components/Layout/JobBox";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, SetHasMore] = useState(true);
  const [apiTotalCount, setApiTotalCount] = useState(0);

  const dispatch = useContext(AuthDispatchContext);
  const { userDetails } = useContext(AuthUserContext);
  let history = useHistory();

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
    setPage(page + 1);
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
    setPage(page + 1);
  };

  return (
    <>
      <div>
        <div>
          <div>Hello</div>
          <div>{userDetails.email}</div>
          <div>search for a job</div>
          <div>
            Showing {(page - 1) * 5} of {apiTotalCount} results
          </div>
        </div>
        <InfiniteScroll
          dataLength={jobs.length}
          next={handleMoreJobs}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<b>Yay! You have seen it all</b>}
        >
          <div className="flex flex-col items-center">
            {jobs && jobs.map((x, i) => <JobBox data={x} key={i} />)}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Dashboard;
