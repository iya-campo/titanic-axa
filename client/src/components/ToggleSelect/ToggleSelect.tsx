import { useState, useEffect, useRef } from "react";
import type { PassengerColumns } from "../../types/Passenger";
import styles from "./ToggleSelect.module.css";

type Option = {
  id: string;
  label: string;
};

interface ToggleSelectProps {
  columns: string[];
  onChange: (selectedColumn: PassengerColumns) => void;
}

const ToggleSelect = ({ columns, onChange }: ToggleSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const selectContainerRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
    { id: "survival", label: "Survival" },
    { id: "class", label: "Ticket class" },
    { id: "sex", label: "Sex" },
    { id: "age", label: "Age" },
    { id: "sibsp", label: "# of Sibling / Spouse" },
    { id: "parch", label: "# of Parent / Child" },
    { id: "ticket", label: "Ticket number" },
    { id: "fare", label: "Passenger fare" },
    { id: "cabin", label: "Cabin number" },
    { id: "port", label: "Port of Embarkation" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectContainerRef.current && !selectContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleOptions = () => setIsOpen((prev) => !prev);

  const handleOptionToggle = (id: PassengerColumns) => onChange(id);

  return (
    <div className={styles.wrapper}>
      <span>Filter columns:</span>
      <div className={styles.selectContainer} ref={selectContainerRef}>
        <div className={styles.selectBox} onClick={toggleOptions}>
          {columns.length > 0
            ? columns
                .map((optionId) => {
                  const option = options.find((opt) => opt.id === optionId);
                  return option ? option.label : "";
                })
                .join(", ")
            : "Select Options"}
          <span className={styles.dropdownArrow}>{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className={styles.optionsList}>
            {options.map((option) => (
              <div
                key={option.id}
                className={`${styles.optionItem} ${
                  columns.includes(option.id) ? styles.selected : ""
                }`}
                onClick={() => handleOptionToggle(option.id as PassengerColumns)}
              >
                <span>{option.label}</span>
                {columns.includes(option.id) && (
                  <span className={styles.checkmark}>✔</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleSelect;