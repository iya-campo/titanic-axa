import type { PassengerQuery } from "../api/passengersApi";

interface FiltersProps {
  filters: PassengerQuery;
  onChange: (newFilters: PassengerQuery) => void;
}

const Filters = ({ filters, onChange }: FiltersProps) => {
  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", marginBottom: "2rem" }}>
      <select
        value={filters.survived ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            survived: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      >
        <option value="">Survival (All)</option>
        <option value="1">Survived</option>
        <option value="0">Died</option>
      </select>

      <select
        value={filters.pclass ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            pclass: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      >
        <option value="">Ticket Class (All)</option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
      </select>

      <select
        value={filters.sex ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            sex: e.target.value ? e.target.value : undefined,
          })
        }
      >
        <option value="">Sex (All)</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        value={filters.port ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            port: e.target.value ? e.target.value : undefined,
          })
        }
      >
        <option value="">Port of Embarkation (All)</option>
        <option value="S">Southampton</option>
        <option value="C">Cherbourg</option>
        <option value="Q">Queenstown</option>
      </select>
    </div>
  );
};

export default Filters;