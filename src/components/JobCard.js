import React, { useState } from "react";
import axios from "axios";
import {
    FaBuilding,
    FaCalendarAlt,
    FaEdit,
    FaSave,
    FaTimes,
    FaTrash,
} from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

const statusColors = {
    Applied: "#3B82F6",
    "Application Viewed": "#8B5CF6",
    "Qualifying Assessment": "#F59E0B",
    Interviewing: "#06B6D4",
    "Offer Letter": "#10B981",
    "Offer Accepted": "#22C55E",
    Rejected: "#EF4444",
    Withdrawn: "#6B7280",
    "On Hold": "#EAB308",
};

const statuses = Object.keys(statusColors);

export default function JobCard({ job, refreshJobs }) {
    const [editing, setEditing] = useState(false);
    const [status, setStatus] = useState(job.status);

    const updateStatus = async () => {
        try {
            await axios.put(
                `${API_URL}/applications/${job._id}`,
                {
                    status,
                }
            );

            setEditing(false);
            refreshJobs();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteJob = async () => {
        if (!window.confirm("Delete this application?")) return;

        try {
            await axios.delete(
                `${API_URL}/applications/${job._id}`
            );

            refreshJobs();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card job-card shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between">

                    <div className="d-flex">

                        <div className="company-avatar">

                            <FaBuilding />

                        </div>

                        <div>

                            <h5 className="mb-1">
                                {job.company}
                            </h5>

                            <small className="text-muted">

                                <FaCalendarAlt className="me-2" />

                                {job.appliedDate.split("T")[0]}

                            </small>

                        </div>

                    </div>

                    <button
                        className="btn btn-light btn-sm delete-btn"
                        onClick={deleteJob}
                    >
                        <FaTrash />
                    </button>

                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">

                    {editing ? (

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statuses.map(item => (
                                <option
                                    key={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>

                    ) : (

                        <span
                            className="status-pill-card"
                            style={{
                                background: statusColors[status]
                            }}
                        >
                            {status}
                        </span>

                    )}

                    {editing ? (

                        <div>

                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={updateStatus}
                            >
                                <FaSave />
                            </button>

                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setEditing(false)}
                            >
                                <FaTimes />
                            </button>

                        </div>

                    ) : (

                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => setEditing(true)}
                        >
                            <FaEdit className="me-1" />
                            Edit
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}