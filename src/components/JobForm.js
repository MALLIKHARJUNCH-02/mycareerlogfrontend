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
            class="form-control border-secondary m-1"
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
                <option>Applied</option>
                <option>Application Viewed</option>
                <option>Qualifying Assessment</option>
                <option>Interviewing</option>
                <option>Offer Letter</option>
                <option>Offer Accepted</option>
                <option>Rejected</option>
                <option>Withdrawn</option>
                <option>On Hold</option>
            </select>
            <button type="submit" class="btn btn-success m-1">Add</button>
        </form>
    );
}

