import React from "react";
import {
    FaBriefcase,
    FaChartLine,
    FaSearch,
    FaCheckCircle,
} from "react-icons/fa";

export default function DashboardHeader() {
    return (
        <div className="dashboard-header shadow-lg">

            <div className="row align-items-center">

                {/* Left Section */}
                <div className="col-lg-8">

                    <div className="d-flex align-items-center">

                        <div className="header-icon me-3">
                            <FaBriefcase />
                        </div>

                        <div>
                            <h1 className="dashboard-title">
                                Job Application Tracker
                            </h1>

                            <p className="dashboard-subtitle">
                                Organize, monitor and manage all your job applications in one
                                place.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Right Section */}
                <div className="col-lg-4">

                    <div className="row g-3 mt-3 mt-lg-0">

                        <div className="col-4">
                            <div className="mini-card">
                                <FaBriefcase className="mini-icon text-primary" />
                                <small>Applications</small>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="mini-card">
                                <FaSearch className="mini-icon text-warning" />
                                <small>Tracking</small>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="mini-card">
                                <FaChartLine className="mini-icon text-success" />
                                <small>Progress</small>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className="header-bottom">

                <div className="status-pill">
                    <FaCheckCircle />
                    <span>Portfolio Project</span>
                </div>

                <div className="status-pill">
                    React
                </div>

                <div className="status-pill">
                    Node.js
                </div>

                <div className="status-pill">
                    MongoDB
                </div>

                <div className="status-pill">
                    Express
                </div>

            </div>

        </div>
    );
}