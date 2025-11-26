import type { PassengerQuery } from "../api/passengersApi";

interface FiltersProps {
  filters: PassengerQuery;
  onChange: (newFilters: PassengerQuery) => void;
}

const Filters = ({ filters, onChange }: FiltersProps) => {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
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
    </div>
  );
};

export default Filters;