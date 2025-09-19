import React, { useState, useMemo } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const statusColors = {
  Applied: "primary",
  "Application Viewed": "secondary",
  "Qualifying Assessment": "warning",
  Interviewing: "info",
  "Offer Letter": "success",
  "Offer Accepted": "success",
  Rejected: "danger",
  Withdrawn: "dark",
  "On Hold": "warning",
};

export default function JobList({ jobs, refreshJobs }) {
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  // ✅ Summary counts
  const statusCounts = useMemo(() => {
    const counts = { Total: jobs?.length || 0 };
    Object.keys(statusColors).forEach((status) => {
      counts[status] = 0;
    });

    jobs?.forEach((job) => {
      if (job.status && counts[job.status] !== undefined) {
        counts[job.status] += 1;
      }
    });

    return counts;
  }, [jobs]);

  const handleEditClick = (job) => {
    setEditingId(job._id || job.id);
    setEditStatus(job.status);
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.put(`${API_URL}/applications/${id}`, { status: editStatus });
      setEditingId(null);
      await refreshJobs();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  if (!jobs || jobs.length === 0)
    return <p className="text-muted text-center mt-4">No applications found.</p>;

  return (
    <div className="container my-4">
      {/* ✅ Applications Summary */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">📊 Applications Summary</h5>
          <div className="row text-center">
            <div className="col-12 mb-2">
              <span className="badge bg-dark p-2">
                Total Applications: {statusCounts.Total}
              </span>
            </div>
            {Object.keys(statusColors).map((status) =>
              statusCounts[status] > 0 ? (
                <div key={status} className="col-md-3 col-6 mb-2">
                  <span className={`badge bg-${statusColors[status]} p-2`}>
                    {status}: {statusCounts[status]}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* ✅ Applications List */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📂 Application Log</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Company</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const isEditing = editingId === (job._id || job.id);
                  return (
                    <tr key={job._id || job.id}>
                      <td>
                        <strong>{job.company}</strong>
                      </td>
                      <td>{job.appliedDate.split("T")[0]}</td>
                      <td>
                        {isEditing ? (
                          <select
                            className="form-select"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            {Object.keys(statusColors).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`badge bg-${
                              statusColors[job.status] || "secondary"
                            }`}
                          >
                            {job.status}
                          </span>
                        )}
                      </td>
                      <td className="text-end">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleSaveClick(job._id || job.id)}
                            >
                              💾 Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={handleCancelClick}
                            >
                              ❌ Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEditClick(job)}
                          >
                            ✏️ Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
