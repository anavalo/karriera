export const filterJobs = (jobs, query) => {
  if (!query) {
    return jobs;
  }

  return jobs.filter((x) => {
    const jobName = x.title.toLowerCase();
    return jobName.includes(query);
  });
};
