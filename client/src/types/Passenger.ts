export interface Passenger {
  PassengerId: number;
  Name: string | null;
  Survived: number | null;
  Pclass: number | null;
  Sex: string | null;
  Age: number | null;
  SibSp?: number;
  Parch?: number;
  Ticket?: string;
  Fare?: number | null;
  Cabin?: string | null;
  Embarked?: string | null;
}

export type PassengerColumns = 'survival' | 'class' | 'sex' | 'age' | 'sibsp' | 'parch' | 'ticket' | 'fare' | 'cabin' | 'port';