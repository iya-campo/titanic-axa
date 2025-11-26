import React, { memo } from "react";
import type { Passenger } from "../types/Passenger";

interface Props {
  data: Passenger[];
}

const PassengerTable: React.FC<Props> = ({ data }) => {
  
  const  mapPort = (key: string) => {
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
  }

  const  mapTicket = (key: number) => {
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
  }

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Survived</th>
          <th>Ticket class</th>
          <th>Sex</th>
          <th>Age</th>
          <th># of Sibling / Spouse</th>
          <th># of Parent / Child</th>
          <th>Ticket number</th>
          <th>Passenger fare</th>
          <th>Cabin number</th>
          <th>Port of Embarkation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.PassengerId}>
            <td>{p.PassengerId}</td>
            <td>{p.Name}</td>
            <td>{p.Survived ? "Yes" : "No"}</td>
            <td>{mapTicket(p.Pclass || 0)}</td>
            <td>{p.Sex}</td>
            <td>{p.Age}</td>
            <td>{p.SibSp}</td>
            <td>{p.Parch}</td>
            <td>{p.Ticket}</td>
            <td>{p.Fare}</td>
            <td>{p.Cabin}</td>
            <td>{mapPort(p.Embarked || '')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(PassengerTable);