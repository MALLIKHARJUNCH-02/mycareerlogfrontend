import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
                <button type="button" className="btn btn-success m-1" onClick={() => handleSaveClick(job._id || job.id)}>Save</button>
                <button type="button" className="btn btn-danger" onClick={handleCancelClick}>Cancel</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => handleEditClick(job)}>Edit</button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
