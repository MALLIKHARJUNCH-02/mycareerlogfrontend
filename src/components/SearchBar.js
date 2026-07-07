import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({
  search,
  setSearch,
  totalJobs,
  filteredJobs,
}) {
  return (
    <div className="search-card mb-4">

      <div className="row align-items-center">

        {/* Search Box */}

        <div className="col-lg-8">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search by company name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control search-input"
            />

            {search && (
              <button
                className="clear-btn"
                onClick={() => setSearch("")}
                type="button"
              >
                <FaTimes />
              </button>
            )}

          </div>

        </div>

        {/* Result Counter */}

        <div className="col-lg-4 mt-3 mt-lg-0">

          <div className="result-card">

            <span className="result-number">
              {filteredJobs}
            </span>

            <span className="result-text">
              Showing {filteredJobs} of {totalJobs} Applications
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}