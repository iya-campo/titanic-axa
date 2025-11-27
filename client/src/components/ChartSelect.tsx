import type { PassengerColumn } from "../types/Passenger";

type Option = {
  id: PassengerColumn;
  label: string;
};

interface ChartSelectProps {
  option: PassengerColumn;
  onChange: (newOption: PassengerColumn) => void;
}

const ChartSelect = ({ option, onChange }: ChartSelectProps) => {

  const options: Option[] = [
    { id: "Sex", label: "Sex" },
    { id: "Pclass", label: "Ticket Class" },
    { id: "Embarked", label: "Port of Embarkation" },
  ];

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <select
        value={option}
        onChange={(e) => onChange(e.target.value as PassengerColumn)}
      >
        {options.map((option: Option) => (
          <option value={option.id}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default ChartSelect;