import React, { useEffect, useState } from 'react';
import axios from 'axios';

const States = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
      try {
        let countryAPI = 'https://crio-location-selector.onrender.com/countries'
        axios.get(countryAPI).then((response) => {

            setCountries(response.data)
        })
      } catch (error) {
        console.log(error);
      }
    
  }, []);
  console.log(countries);
  const fetchStates = async () => {
    try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(''); 
    setSelectedCity(''); 
    fetchStates();
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); 
    fetchCities();
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
//   let msg;
  const displaySelectedLocation = () => {
    
    if (selectedCity && selectedState && selectedCountry) {
    //   msg = ` You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`
      return true
    }else{
        return false
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='text-center'>
        <h1 className='font-bold text-4xl pb-8'>Select Location</h1>

        <div className=''>
          <select className='w-80 mr-5 p-2' value={selectedCountry} onChange={handleCountryChange}>
            <option value=''>Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select className='w-40 mr-5 p-2' value={selectedState} onChange={handleStateChange}>
            <option value=''>Select State</option>
            {states.map((state, idx) => (
              <option key={idx} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select className='w-32 p-2' value={selectedCity} onChange={handleCityChange}>
            <option value=''>Select City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
            {displaySelectedLocation ? (
                <span> <p>You Selected {selectedCity}, </p>{selectedState}, {selectedCountry}</span>
            ) : (
                ""
            )}
        
      </div>
    </div>
  );
};

export default States;
