import { useState, useEffect, useCallback, useMemo } from "react";
import { getPassengers, type PassengerQuery } from "../api/passengersApi";
import type { Passenger } from "../types/Passenger";

export default function usePassengers(filters: PassengerQuery) {
  const [data, setData] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPassengers(filters);
      setData(result);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(() => {
    const survived = data.filter((p) => p.Survived === 1).length;
    const died = data.filter((p) => p.Survived === 0).length;
    return {
      total: data.length,
      survived,
      died,
    };
  }, [data]);

  return { data, loading, stats };
}