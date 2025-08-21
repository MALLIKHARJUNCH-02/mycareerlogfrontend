import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import SearchBar from '../components/SearchBar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch data from backend
  useEffect(() => {
    axios.get(`${API_URL}/applications`)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add job handler
  const addJob = async (job) => {
    const res = await axios.post(`${API_URL}/applications`, job);
    setJobs([res.data, ...jobs]);
  };

  // Filtered jobs based on search
 // Filtered jobs based on search
const filteredJobs = jobs.filter(job => {
  const company = job.company;
  // Ensure company is a string before using toLowerCase
  if (typeof company !== 'string') return false;
  return company.toLowerCase().includes(search.toLowerCase());
});


  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '10px' }}>
      <h1>Job Application Tracker</h1>
      <JobForm addJob={addJob} />
      <SearchBar search={search} setSearch={setSearch} />
      <JobList jobs={filteredJobs} />
    </div>
  );
}
