const CountryCard = ({ country }) => {
  return (
    <div className="card">
      <h2>
        {country.name.common} {country.flag}{" "}
      </h2>
      <h4> ({country.name.official})</h4>
      {/* <img src={country.flag.svg} /> */}
      <div>
        <ul>
          <li>
            Currency:
            {country.currencies && Object.values(country.currencies)[0].name}(
            {country.currencies && Object.values(country.currencies)[0].symbol})
          </li>
          <li>Capital: {country.capital} </li>
          <li>Region: {country.region} </li>
          <li>Area: {country.area} km²</li>
          <li>Population {country.population} </li>
        </ul>
      </div>
    </div>
  );
};
export default CountryCard;
