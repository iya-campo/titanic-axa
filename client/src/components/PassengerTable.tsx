import { memo } from "react";
import type { Passenger, PassengerColumn } from "../types/Passenger";
import { capitalize, mapNames, mapPort, mapTicket } from "../utils/common";

interface PassengerTableProps {
  data: Passenger[];
  columns: PassengerColumn[];
}

const PassengerTable = ({ data, columns }: PassengerTableProps) => {

  const mapValues = (col: PassengerColumn, val: string | number) => {
    switch (col) {
      case 'Survived':
        return val ? 'Yes' : 'No'
      case 'Pclass':
        return mapTicket(val as number);
      case 'Sex':
        return capitalize(val as string)
      case 'Embarked':
        return mapPort(val as string);
      default:
        return val;
    }
  }

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {columns.map((col: PassengerColumn) => {
            return columns.includes(col) && <th>{mapNames(col)}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? data.map((p) => (
          <tr key={p.PassengerId}>
            <td>{p.PassengerId}</td>
            <td>{p.Name}</td>
            {columns.map((col: PassengerColumn) => {
              return columns.includes(col) && <td>{mapValues(col, p[col] as string | number)}</td>
            })}
          </tr>
        )) : <p>No results found.</p>}
      </tbody>
    </table>
  );
};

export default memo(PassengerTable);