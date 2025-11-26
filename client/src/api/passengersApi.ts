import type { Passenger } from "../types/Passenger";
import { fetcher } from "../utils/fetcher";

const BASE_URL = "http://localhost:8000";

export interface PassengerQuery {
  survived?: number;
  pclass?: number;
  sex?: string;
  port?: string;
}

export const getPassengers = (params: PassengerQuery = {}): Promise<Passenger[]> => {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
    )
  );

  return fetcher<Passenger[]>(`${BASE_URL}/passengers?${query.toString()}`);
};