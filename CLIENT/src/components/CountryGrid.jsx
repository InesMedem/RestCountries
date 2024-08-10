import CountryCard from "./CountryCard";

const CountryGrid = ({ countries }) => {
  return (
    <div className="country-Grid">
      {countries.map((country) => (
        <CountryCard key={country.cca2} country={country} />
      ))}
    </div>
  );
};
export default CountryGrid;
