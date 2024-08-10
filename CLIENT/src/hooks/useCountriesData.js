import { useEffect, useState } from "react";
import {
  checkCountriesExist,
  getAllCountries,
  saveALlCountries,
} from "../services/indexedDBService";

const useCountriesData = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesExist = await checkCountriesExist();

        if (countriesExist) {
          const storedCountries = await getAllCountries();
          setCountries(storedCountries);
        } else {
          const response = await fetch("/api/v3.1/all");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          await saveALlCountries(result);
          setCountries(result);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }),
    [];
  return { countries, loading, error };
};
export default useCountriesData;
