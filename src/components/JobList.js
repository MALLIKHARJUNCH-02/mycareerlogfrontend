import React from "react";
import JobCard from "./JobCard";

export default function JobList({
  jobs,
  refreshJobs,
}) {

  if (jobs.length === 0) {

    return (

      <div className="empty-state">

        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt=""
          width="160"
        />

        <h3>No Applications Found</h3>

        <p>
          Start by adding your first job application.
        </p>

      </div>

    )

  }

  return (

    <div className="row">

      {

        jobs.map(job => (

          <div
            className="col-lg-6 mb-4"
            key={job._id}
          >

            <JobCard
              job={job}
              refreshJobs={refreshJobs}
            />

          </div>

        ))

      }

    </div>

  )

}