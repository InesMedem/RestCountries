const CountryCard = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Currency:
        {country.currencies && Object.values(country.currencies)[0].name}(
        {country.currencies && Object.values(country.currencies)[0].symbol})
      </p>{" "}
    </div>
  );
};
export default CountryCard;
