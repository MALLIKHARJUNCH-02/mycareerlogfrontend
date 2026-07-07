import React, { useState } from "react";
import {
    FaPlus,
} from "react-icons/fa";

const statusOptions = [
    "Applied",
    "Application Viewed",
    "Qualifying Assessment",
    "Interviewing",
    "Offer Letter",
    "Offer Accepted",
    "Rejected",
    "Withdrawn",
    "On Hold",
];

export default function JobForm({ addJob }) {
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Applied");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!company || !date) return;

        addJob({
            company,
            appliedDate: date,
            status,
        });

        setCompany("");
        setDate("");
        setStatus("Applied");
    };

    return (
        <div className="job-form-card">

            <div className="d-flex align-items-center mb-4">

                <div className="form-title-icon">
                    <FaPlus />
                </div>

                <div>
                    <h3 className="mb-0">Add New Application</h3>
                    <small className="text-muted">
                        Keep track of every company you apply to.
                    </small>
                </div>

            </div>

            <form onSubmit={handleSubmit}>

                <div className="row g-4">

                    {/* Company */}

                    <div className="col-lg-4">

                        <label className="form-label fw-semibold">
                            Company
                        </label>

                        <div className="input-icon">

                          <input
                                type="text"
                                className="form-control modern-input"
                                placeholder="Google, Microsoft..."
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    {/* Date */}

                    <div className="col-lg-3">

                        <label className="form-label fw-semibold">
                            Applied Date
                        </label>
                        <div className="input-icon">
                            <input
                                type="date"
                                className="form-control modern-input"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    {/* Status */}

                    <div className="col-lg-3">

                        <label className="form-label fw-semibold">
                            Status
                        </label>

                        <div className="input-icon">
                            <select
                                className="form-select modern-input"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {statusOptions.map((item) => (
                                    <option key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>

                    {/* Button */}

                    <div className="col-lg-2 d-flex align-items-end">

                        <button
                            className="btn add-btn w-100"
                            type="submit"
                        >
                            <FaPlus className="me-2" />
                            Add
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
}