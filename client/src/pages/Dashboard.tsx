import { useState, useCallback } from "react";
import type { PassengerQuery } from "../api/passengersApi";
import type { PassengerColumn } from "../types/Passenger";
import usePassengers from "../hooks/usePassenger";
import PassengerTable from "../components/PassengerTable";
import PassengerChart from "../components/PassengerChart";
import ChartSelect from "../components/ChartSelect";
import Filters from "../components/Filters";
import ToggleSelect from "../components/ToggleSelect/ToggleSelect";
import { mapNames } from "../utils/common";

const Dashboard = () => {
  const [filters, setFilters] = useState<PassengerQuery>({});
  const [option, setOption] = useState<PassengerColumn>('Pclass');
  const [columns, setColumns] = useState<PassengerColumn[]>(['Survived', 'Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked']);

  const handleFilterChange = useCallback((newFilters: PassengerQuery) => {
    setFilters(newFilters);
  }, []);

  const handleChartChange = useCallback((newOption: PassengerColumn) => {
    setOption(newOption);
  }, []);

  const handleColumnChange = useCallback((selectedColumn: PassengerColumn) => {
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

      <ChartSelect option={option} onChange={handleChartChange} />

      <h2 style={{ marginTop: "2rem" }}>{`Passengers per ${mapNames(option)}`}</h2>
      <PassengerChart data={data} option={option} />

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Filters filters={filters} onChange={handleFilterChange} />
        <ToggleSelect columns={columns} onChange={handleColumnChange} />
      </div>
      
      {loading ? <p>Loading...</p> : <PassengerTable data={data} columns={columns} />}
    </div>
  );
};

export default Dashboard;