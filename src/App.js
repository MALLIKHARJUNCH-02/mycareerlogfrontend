import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHeader from "./components/DashboardHeader";
import SummaryCards from "./components/SummaryCards";
import JobForm from "./components/JobForm";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import Charts from "./components/Charts";

import "./styles/dashboard.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {

    try {

      const res = await axios.get(`${API_URL}/applications`);

      setJobs(res.data);

    }
    catch (err) {

      console.log(err);

    }

  }

  useEffect(() => {

    fetchJobs();

  }, []);

  const addJob = async (job) => {

    try {

      await axios.post(`${API_URL}/applications`, job);

      fetchJobs();

    }
    catch (err) {

      console.log(err);

    }

  }

  const filteredJobs = jobs.filter(job =>

    job.company.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div>

      <DashboardHeader />

      <div className="container py-5">

        <SummaryCards jobs={jobs} />

        <div className="my-4">

          <JobForm addJob={addJob} />

        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />


        <JobList
          jobs={filteredJobs}
          refreshJobs={fetchJobs}
        />

        <Charts jobs={jobs} />
      </div>

    </div>

  )

}

export default App;