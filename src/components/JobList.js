import React, { useState, useMemo } from 'react';
import axios from 'axios';
import "../components/jobList.css"
const API_URL = process.env.REACT_APP_API_URL;

const statusColors = {
  Applied: '#3498db',
  'Application Viewed': '#9b59b6',
  'Qualifying Assessment': '#f39c12',
  Interviewing: '#2980b9',
  'Offer Letter': '#27ae60',
  'Offer Accepted': '#2ecc71',
  Rejected: '#e74c3c',
  Withdrawn: '#95a5a6',
  'On Hold': '#f1c40f',
};

export default function JobList({ jobs, refreshJobs }) {
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');

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
      console.error('Update error:', err);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  if (!jobs || jobs.length === 0)
    return <p className="text-muted text-center mt-4">No applications found.</p>;

  return (
    <div className="job-list-container">
      {/* 🔹 Applications Summary */}
      <div className="card shadow-sm mb-4 border-0 summary-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h5 className="card-title mb-1">📊 Applications Summary</h5>
              <small className="text-muted">
                Track your application pipeline at a glance.
              </small>
            </div>
            <div className="summary-total-pill">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-value">{statusCounts.Total}</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {Object.keys(statusColors).map((status) => (
              <div key={status} className="status-chip d-flex align-items-center">
                <span
                  className="status-dot"
                  style={{ backgroundColor: statusColors[status] }}
                />
                <span className="status-chip-label">{status}</span>
                <span className="status-chip-count">{statusCounts[status]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Applications List */}
      <div className="job-list">
        {jobs.map((job) => {
          const id = job._id || job.id;
          const isEditing = editingId === id;

          const appliedDate =
            job.appliedDate && job.appliedDate.includes('T')
              ? job.appliedDate.split('T')[0]
              : job.appliedDate || 'N/A';

          const statusColor = statusColors[job.status] || '#34495e';

          return (
            <div
              key={id}
              className="card shadow-sm mb-3 border-0 job-card"
            >
              <div className="card-body">
                {/* Top row: Company + role + status */}
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <h5 className="card-title mb-1">
                      {job.role || job.position || 'Job Application'}
                    </h5>
                    <p className="card-subtitle text-muted mb-0">
                      {job.company}
                    </p>
                  </div>

                  <div className="d-flex flex-column align-items-end gap-2">
                    {/* Status / Status Edit */}
                    {isEditing ? (
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="form-select form-select-sm status-select"
                      >
                        {Object.keys(statusColors).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className="badge status-badge"
                        style={{ backgroundColor: statusColor }}
                      >
                        {job.status}
                      </span>
                    )}

                    {/* Edit / Save / Cancel Buttons */}
                    <div className="d-flex gap-1">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => handleSaveClick(id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditClick(job)}
                        >
                          Edit Status
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom row: Meta info */}
                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                  <small className="text-muted">
                    Applied on <strong>{appliedDate}</strong>
                  </small>
                  {job.location && (
                    <small className="text-muted">
                      📍 {job.location}
                    </small>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
