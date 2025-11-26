import { useState, useCallback } from "react";
import type { PassengerQuery } from "../api/passengersApi";
import type { PassengerColumns } from "../types/Passenger";
import usePassengers from "../hooks/usePassenger";
import PassengerTable from "../components/PassengerTable";
import PassengerChart from "../components/PassengerChart";
import Filters from "../components/Filter";
import ToggleSelect from "../components/ToggleSelect/ToggleSelect";

const Dashboard = () => {
  const [filters, setFilters] = useState<PassengerQuery>({});
  const [columns, setColumns] = useState<PassengerColumns[]>(['survival', 'class', 'sex', 'age', 'sibsp', 'parch', 'ticket', 'fare', 'cabin', 'port']);

  const handleFilterChange = useCallback((newFilters: PassengerQuery) => {
    setFilters(newFilters);
  }, []);

  const handleColumnChange = useCallback((selectedColumn: PassengerColumns) => {
    setColumns((prev) => {
      if (prev.includes(selectedColumn)) {
        return prev.filter((column) => column !== selectedColumn);
      } else {
        return [...prev, selectedColumn];
      }
    });
  }, []);

  const { data, loading } = usePassengers(filters);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Titanic Dashboard</h1>

      <Filters filters={filters} onChange={handleFilterChange} />

      <h2 style={{ marginTop: "2rem" }}>Passengers per Class</h2>
      <PassengerChart data={data} />

      <ToggleSelect columns={columns} onChange={handleColumnChange} />

      {loading ? <p>Loading...</p> : <PassengerTable data={data} columns={columns} />}
    </div>
  );
};

export default Dashboard;