import { useState, useEffect } from "react";
import {
  checkCountriesExist,
  getAllCountries,
  saveALlCountries,
} from "./indexedDBService";

const RestcountriesAPI = () => {
  //* 1. Initialize state

  const [countries, setCountries] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //* 2. fetch data

  useEffect(() => {
    //* define async function

    const fetchData = async () => {
      try {
        const countriesExist = await checkCountriesExist();

        if (countriesExist) {
          const storedCountries = await getAllCountries();
          setCountries(storedCountries);
        } else {
          // Use the proxy path instead of the direct API URL
          const response = await fetch("/api/v3.1/all");
          // Log the response to inspect the headers and body
          if (!response.ok) {
            throw new Error("Netwrok response was not ok");
          }

          const result = await response.json();
          await saveALlCountries(result);

          setCountries(result); // update teh stata state
        }
      } catch (error) {
        setError(error); // update teh error state
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // call the async function
  }, []); // Empty dependency array means this effect runs once on mount

  //* 3. render component
  if (loading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Restcountries API</h1>
      <ul>
        {countries.map((countries) => (
          <li key={countries.cca2}>
            <h2>{countries.name.common}</h2>
            <p>
              Currency:
              {countries.currencies &&
                Object.values(countries.currencies)[0].name}
              (
              {countries.currencies &&
                Object.values(countries.currencies)[0].symbol}
              )
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RestcountriesAPI;
