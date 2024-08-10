import CountryGrid from "./components/CountryGrid";
import Spinner from "./components/Spinner";
import useCountriesData from "./hooks/useCountriesData";

const App = () => {
  const { countries, loading, error } = useCountriesData();

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <h1>Countries of the World</h1>
      <CountryGrid countries={countries} />
    </div>
  );
};
export default App;
