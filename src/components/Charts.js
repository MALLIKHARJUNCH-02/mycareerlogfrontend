import React, { useMemo } from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

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

export default function Charts({ jobs }) {
    /* -------------------- Doughnut -------------------- */

    const doughnutData = useMemo(() => {
        const counts = {};

        Object.keys(statusColors).forEach((status) => {
            counts[status] = 0;
        });

        jobs.forEach((job) => {
            if (counts[job.status] !== undefined) {
                counts[job.status]++;
            }
        });

        return {
            labels: Object.keys(counts),

            datasets: [
                {
                    data: Object.values(counts),

                    backgroundColor: Object.values(statusColors),

                    borderWidth: 2,
                },
            ],
        };
    }, [jobs]);

    /* -------------------- Monthly Chart -------------------- */

    const barData = useMemo(() => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const monthCount = new Array(12).fill(0);

        jobs.forEach((job) => {
            const month = new Date(job.appliedDate).getMonth();
            monthCount[month]++;
        });

        return {
            labels: months,

            datasets: [
                {
                    label: "Applications",

                    data: monthCount,

                    backgroundColor: "#4F46E5",

                    borderRadius: 10,
                },
            ],
        };
    }, [jobs]);

    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <div className="row mb-4 mt-4">
            {/* Doughnut */}

            <div className="col-lg-5 mb-4">
                <div className="chart-card">
                    <h5 className="chart-title">
                        Applications by Status
                    </h5>

                    <Doughnut
                        data={doughnutData}
                        options={options}
                    />
                </div>
            </div>

            {/* Bar */}

            <div className="col-lg-7 mb-4">
                <div className="chart-card">
                    <h5 className="chart-title">
                        Monthly Applications
                    </h5>

                    <Bar
                        data={barData}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}