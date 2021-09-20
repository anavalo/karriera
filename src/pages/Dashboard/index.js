import React, { useEffect, useState, useContext } from "react";
import { getJobs } from "../../services";
import { useHistory } from "react-router-dom";
import { logout } from "../../services";
import { AuthDispatchContext } from "../../context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, SetHasMore] = useState(true);
  const [apiTotalCount, setApiTotalCount] = useState(0);

  const dispatch = useContext(AuthDispatchContext);
  let history = useHistory();
  
  const { expiresIn } = JSON.parse(localStorage.getItem("token"));
  const isTokenExpired = Date.now() >= new Date(expiresIn);


  useEffect(() => {
    if (isTokenExpired) {
      logout(dispatch);
      history.push("/");
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
        <h1>Dashboard</h1>
        <InfiniteScroll
          dataLength={jobs.length}
          next={handleMoreJobs}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<b>Yay! You have seen it all</b>}
        >
          {jobs.map((x, i) => (
            <>
              <div key={i}>
                <div>{x.title}</div>
                <div>{x.id}</div>
              </div>
            </>
          ))}
        </InfiniteScroll>
      </div>
      <button onClick={(e) => handleMoreJobs(e)}>more jobs</button>
    </>
  );
};

export default Dashboard;
