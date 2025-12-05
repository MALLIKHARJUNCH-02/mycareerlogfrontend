import React, { useState } from 'react';

export default function JobForm({ addJob }) {
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Applied');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!company || !date) return;
        addJob({ company, appliedDate: date, status });
        setCompany('');
        setDate('');
        setStatus('Applied');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '15px' }}>
            <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Company Name"
                required
                style={{ marginRight: '10px' }}
            />
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ marginRight: '10px' }}>
                <option value="application_submitted">Application Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="assessment_in_progress">Assessment in Progress</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="awaiting_decision">Interview Completed — Awaiting Decision</option>
                <option value="offer_extended">Offer Extended</option>
                <option value="offer_accepted">Offer Accepted</option>
                <option value="not_selected">Not Selected</option>
                <option value="withdrawn">Application Withdrawn</option>
                <option value="on_hold">On Hold</option>
            </select>

            <button type="submit">Add</button>
        </form>
    );
}

