import React, { useMemo } from "react";
import {
    FaBriefcase,
    FaPaperPlane,
    FaEye,
    FaClipboardCheck,
    FaUsers,
    FaFileSignature,
    FaCheckCircle,
    FaTimesCircle,
    FaPauseCircle,
} from "react-icons/fa";

const statusConfig = {
    Applied: {
        icon: <FaPaperPlane />,
        color: "#3B82F6",
    },
    "Application Viewed": {
        icon: <FaEye />,
        color: "#8B5CF6",
    },
    "Qualifying Assessment": {
        icon: <FaClipboardCheck />,
        color: "#F59E0B",
    },
    Interviewing: {
        icon: <FaUsers />,
        color: "#06B6D4",
    },
    "Offer Letter": {
        icon: <FaFileSignature />,
        color: "#10B981",
    },
    "Offer Accepted": {
        icon: <FaCheckCircle />,
        color: "#22C55E",
    },
    Rejected: {
        icon: <FaTimesCircle />,
        color: "#EF4444",
    },
    Withdrawn: {
        icon: <FaTimesCircle />,
        color: "#6B7280",
    },
    "On Hold": {
        icon: <FaPauseCircle />,
        color: "#FACC15",
    },
};

export default function SummaryCards({ jobs }) {

    const counts = useMemo(() => {

        const obj = {
            Total: jobs.length,
        };

        Object.keys(statusConfig).forEach(status => {
            obj[status] = 0;
        });

        jobs.forEach(job => {
            if (obj[job.status] !== undefined) {
                obj[job.status]++;
            }
        });

        return obj;

    }, [jobs]);

    return (

        <>

            {/* Total */}

            <div className="row mb-4">

                <div className="col-lg-3 col-md-6 mb-4">

                    <div className="summary-card total-card">

                        <div className="summary-icon">
                            <FaBriefcase />
                        </div>

                        <h2>{counts.Total}</h2>

                        <p>Total Applications</p>

                    </div>

                </div>

                {Object.keys(statusConfig).map(status => (

                    <div className="col-lg-3 col-md-6 mb-4" key={status}>

                        <div className="summary-card">

                            <div
                                className="summary-icon"
                                style={{
                                    background: statusConfig[status].color
                                }}
                            >
                                {statusConfig[status].icon}
                            </div>

                            <h3>{counts[status]}</h3>

                            <small>{status}</small>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );
}