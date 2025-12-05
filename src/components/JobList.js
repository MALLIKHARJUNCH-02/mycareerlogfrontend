import React, { useState, useMemo } from 'react';
import axios from 'axios';

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
  'On Hold': '#f1c40f'
};

export default function JobList({ jobs, refreshJobs }) {
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  // ✅ Summary counts (memoized for performance)
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

  if (!jobs || jobs.length === 0) return <p>No applications found.</p>;

  return (
    <div>
      {/* ✅ Applications Summary */}
      <div className="mb-3 p-3 border rounded">
        <h5>📊 Applications Summary</h5>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li><strong>Total:</strong> {statusCounts.Total}</li>
          {Object.keys(statusColors).map((status) => (
            <li key={status}>
              <span style={{ color: statusColors[status] }}>
                {status}:
              </span>{' '}
              {statusCounts[status]}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Applications List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map((job) => {
          const isEditing = editingId === (job._id || job.id);
          return (
            <li key={job._id || job.id} style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
              <strong>{job.company}</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
              Applied on: {job.appliedDate.split('T')[0]} &nbsp;&nbsp;|&nbsp;&nbsp;
              Status:{' '}
              {isEditing ? (
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                  {Object.keys(statusColors).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              ) : (
                <span style={{ color: statusColors[job.status] || '#000' }}>{job.status}</span>
              )}
              &nbsp;&nbsp;
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="btn btn-success m-1"
                    onClick={() => handleSaveClick(job._id || job.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEditClick(job)}
                >
                  Edit
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
