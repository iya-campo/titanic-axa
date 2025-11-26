import React, { useState, useCallback } from "react";
import usePassengers from "../hooks/usePassenger";
import PassengerTable from "../components/PassengerTable";
import PassengerChart from "../components/PassengerChart";
import Filters from "../components/Filter";
import type { PassengerQuery } from "../api/passengersApi";

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<PassengerQuery>({});

  const handleFilterChange = useCallback((newFilters: PassengerQuery) => {
    setFilters(newFilters);
  }, []);

  const { data, loading } = usePassengers(filters);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Titanic Dashboard</h1>

      <Filters filters={filters} onChange={handleFilterChange} />

      <h2 style={{ marginTop: "2rem" }}>Passengers per Class</h2>
      <PassengerChart data={data} />

      {loading ? <p>Loading...</p> : <PassengerTable data={data} />}
    </div>
  );
};

export default Dashboard;