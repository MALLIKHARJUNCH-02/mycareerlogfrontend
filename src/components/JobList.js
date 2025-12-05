import React, { useState, useMemo } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// ✅ New professional statuses & colors
const STATUS_OPTIONS = [
  { value: "application_submitted", label: "Application Submitted", color: "#3498db" },
  { value: "under_review", label: "Under Review", color: "#9b59b6" },
  { value: "assessment_in_progress", label: "Assessment in Progress", color: "#f39c12" },
  { value: "shortlisted", label: "Shortlisted", color: "#1abc9c" },
  { value: "interview_scheduled", label: "Interview Scheduled", color: "#2980b9" },
  { value: "awaiting_decision", label: "Interview Completed — Awaiting Decision", color: "#8e44ad" },
  { value: "offer_extended", label: "Offer Extended", color: "#27ae60" },
  { value: "offer_accepted", label: "Offer Accepted", color: "#2ecc71" },
  { value: "not_selected", label: "Not Selected", color: "#e74c3c" },
  { value: "withdrawn", label: "Application Withdrawn", color: "#95a5a6" },
  { value: "on_hold", label: "On Hold", color: "#f1c40f" }
];

export default function JobList({ jobs, refreshJobs }) {
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  const statusCounts = useMemo(() => {
    const counts = { Total: jobs?.length || 0 };
    STATUS_OPTIONS.forEach(opt => (counts[opt.label] = 0));

    jobs?.forEach(job => {
      const found = STATUS_OPTIONS.find(opt => opt.value === job.status);
      if (found) counts[found.label]++;
    });

    return counts;
  }, [jobs]);

  const handleSaveClick = async id => {
    try {
      await axios.put(`${API_URL}/applications/${id}`, { status: editStatus });
      setEditingId(null);
      await refreshJobs();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!jobs?.length) return <p>No applications found.</p>;

  return (
    <div className="container">

      {/* 📊 Summary Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">📊 Applications Summary</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><strong>Total:</strong> {statusCounts.Total}</li>
            {STATUS_OPTIONS.map(opt => (
              <li key={opt.value} style={{ color: opt.color }}>
                {opt.label}: {statusCounts[opt.label]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 📌 Job Cards */}
      <div className="row">
        {jobs.map(job => {
          const isEditing = editingId === job._id;
          const statusOption = STATUS_OPTIONS.find(opt => opt.value === job.status);

          return (
            <div className="col-md-6 mb-3" key={job._id}>
              <div className="card shadow-sm">
                <div className="card-body">

                  <h6 className="card-title">{job.company}</h6>
                  <p className="text-muted mb-2">
                    Applied on: {job.appliedDate.split("T")[0]}
                  </p>

                  <strong>Status: </strong>
                  {isEditing ? (
                    <select
                      className="form-select mt-2"
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className="badge px-2 py-1"
                      style={{ backgroundColor: statusOption?.color || "#333" }}
                    >
                      {statusOption?.label}
                    </span>
                  )}

                  <div className="mt-3">
                    {isEditing ? (
                      <>
                        <button className="btn btn-success btn-sm me-2"
                          onClick={() => handleSaveClick(job._id)}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-primary btn-sm"
                        onClick={() => {
                          setEditingId(job._id);
                          setEditStatus(job.status);
                        }}>
                        Edit
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
