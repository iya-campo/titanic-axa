import { memo, useCallback } from "react";
import type { Passenger, PassengerColumns } from "../types/Passenger";

interface PassengerTableProps {
  data: Passenger[];
  columns: PassengerColumns[];
}

const PassengerTable = ({ data, columns }: PassengerTableProps) => {
  
    const mapPort = useCallback((key: string) => {
    switch (key) {
      case 'C':
        return 'Cherbourg';
      case 'Q':
        return 'Queenstown';
      case 'S':
        return 'Southampton';
      default:
        return '';
    }
  }, []);

  const mapTicket = useCallback((key: number) => {
    switch (key) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return 0;
    }
  }, []);

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {columns.includes('survival') && <th>Survived</th>}
          {columns.includes('class') && <th>Ticket class</th>}
          {columns.includes('sex') && <th>Sex</th>}
          {columns.includes('age') && <th>Age</th>}
          {columns.includes('sibsp') && <th># of Sibling / Spouse</th>}
          {columns.includes('parch') && <th># of Parent / Child</th>}
          {columns.includes('ticket') && <th>Ticket number</th>}
          {columns.includes('fare') && <th>Passenger fare</th>}
          {columns.includes('cabin') && <th>Cabin number</th>}
          {columns.includes('port') && <th>Port of Embarkation</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.PassengerId}>
            <td>{p.PassengerId}</td>
            <td>{p.Name}</td>
            {columns.includes('survival') && <td>{p.Survived ? "Yes" : "No"}</td>}
            {columns.includes('class') && <td>{mapTicket(p.Pclass || 0)}</td>}
            {columns.includes('sex') && <td>{p.Sex}</td>}
            {columns.includes('age') && <td>{p.Age}</td>}
            {columns.includes('sibsp') && <td>{p.SibSp}</td>}
            {columns.includes('parch') && <td>{p.Parch}</td>}
            {columns.includes('ticket') && <td>{p.Ticket}</td>}
            {columns.includes('fare') && <td>{p.Fare}</td>}
            {columns.includes('cabin') && <td>{p.Cabin}</td>}
            {columns.includes('port') && <td>{mapPort(p.Embarked || '')}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(PassengerTable);