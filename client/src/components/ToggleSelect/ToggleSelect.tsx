import { useState, useEffect, useRef } from "react";
import type { PassengerColumn } from "../../types/Passenger";
import styles from "./ToggleSelect.module.css";
import { mapNames } from "../../utils/common";

interface ToggleSelectProps {
  columns: string[];
  onChange: (selectedColumn: PassengerColumn) => void;
}

const ToggleSelect = ({ columns, onChange }: ToggleSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const selectContainerRef = useRef<HTMLDivElement>(null);

  const options: PassengerColumn[] = [
    "Survived",
    "Pclass",
    "Sex",
    "Age",
    "SibSp",
    "Parch",
    "Ticket",
    "Fare",
    "Cabin",
    "Embarked",
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

  const handleOptionToggle = (id: PassengerColumn) => onChange(id);

  return (
    <div className={styles.wrapper}>
      <span>Filter columns:</span>
      <div className={styles.selectContainer} ref={selectContainerRef}>
        <div className={styles.selectBox} onClick={toggleOptions}>
          {columns.length > 0
            ? columns
                .map((column) => {
                  const option = options.find((opt) => opt === column);
                  return option ? option : "";
                })
                .join(", ")
            : "Select Options"}
          <span className={styles.dropdownArrow}>{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className={styles.optionsList}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.optionItem} ${
                  columns.includes(option) ? styles.selected : ""
                }`}
                onClick={() => handleOptionToggle(option as PassengerColumn)}
              >
                <span>{mapNames(option)}</span>
                {columns.includes(option) && (
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