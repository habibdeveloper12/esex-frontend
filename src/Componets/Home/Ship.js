import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Ship = () => {
  const [countries, setCountries] = useState([]);
  const [originCountry, setOriginCountry] = useState(null);
  const [destinationCountry, setDestinationCountry] = useState(null);
  const [showZipCodeInputs, setShowZipCodeInputs] = useState(false);
  const [fromZipCode, setFromZipCode] = useState('');
  const [toZipCode, setToZipCode] = useState('');
  const [selectedOption, setSelectedOption] = useState('residential');
  const [zipCodeError, setZipCodeError] = useState('');
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [weightUnit, setWeightUnit] = useState(null);
  const [showWightInput,setshowWightInput] = useState(false);
  const weightUnitOptions = [
    { value: 'lt05', label: 'Less than 0.5 lb' },
    { value: '05-1', label: '0.5-1 lb' },
    { value: '101-2', label: '1.01-2 lb' },
    { value: '201-3', label: '2.01-3 lb' },
  ];

  useEffect(() => {
    // Fetch country data from the REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryOptions = data.map((country) => ({
          value: country.alpha2Code,
          label: country.name.common,
          flag: country.flags.svg,
          zipCodeFormat: country.address ? country.address.postalCode : null,
        }));
      // Sort countries alphabetically by label
      countryOptions.sort((a, b) => a.label.localeCompare(b.label));
      setCountries(countryOptions);

      // Find and set the United States as the default origin country
      const usaCountry = countryOptions.find((country) => country.label === 'United States');
      setOriginCountry(usaCountry);
      const defaultDestinationCountry = countryOptions.find((country) => country.label === 'United States');
  setDestinationCountry(defaultDestinationCountry);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  

    fetchCountries();
  }, []);

  const handleOriginChange = (selectedOption) => {
    setOriginCountry(selectedOption);
  };

  const handleDestinationChange = (selectedOption) => {
    setDestinationCountry(selectedOption);
  };

  const handleQuickQuoteClick = () => {
    if (!validationTriggered) {
      // Show ZIP code inputs on the first click
      setshowWightInput(true)
      setShowZipCodeInputs(true);
      setValidationTriggered(true);
    } else {
      // Validate ZIP codes on the second click
      if (!isValidZipCode(fromZipCode, originCountry)) {
        setZipCodeError('Invalid Zipcode');
        return false;
      }

      if (!isValidZipCode(toZipCode, destinationCountry)) {
        alert('Invalid or missing To Zip Code for the selected country.');
        return;
      }

    }
  };

  const isValidZipCode = (zipCode, country) => {
    if (!country || !country.zipCodeFormat) {
      // Country or zip code format is not available
      return false;
    }

    // Simple validation: Check if the entered ZIP code matches the expected format
    const zipCodeRegex = new RegExp(country.zipCodeFormat);
    return zipCodeRegex.test(zipCode);
  };

  return (
    <div className='bglightship'>
      <div className='dflex py-5 container'>
        <div className='bg-white rounded p-5'>
          <div className='dflex align-items-center justify-content-between'>
            <div className='pe-1' style={{ flex: '1' }}>
              <label className='me-3'>Ship from</label>
              <Select
                value={originCountry}
                onChange={handleOriginChange}
                options={countries}
                isSearchable
                // isDisabled
                placeholder="Select country"
                formatOptionLabel={({ label, flag }) => (
                  <div className="d-flex align-items-center">
                    <img src={flag} alt={label} className="me-2" style={{ width: '1.5em', height: '1.5em' }} />
                    {label}
                  </div>
                )}
              />
            </div>
            <div className='ps-1' style={{ flex: '1' }}>
              <label className='me-3'>Ship to</label>
              <Select
                value={originCountry&&destinationCountry}
                onChange={handleDestinationChange}
                options={countries}
                isSearchable
                placeholder="Select country"
                formatOptionLabel={({ label, flag }) => (
                  <div className="d-flex align-items-center">
                    <img src={flag} alt={label} className="me-2" style={{ width: '1.5em', height: '1.5em' }} />
                    {label}
                  </div>
                )}
              />
            </div>
          </div>

          {showZipCodeInputs && (
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
  <div className='zipcode-inputs d-flex' style={{ marginBottom: '20px' }}>
<div>
<input
      type='text'
      placeholder="Enter From Zip Code"
      value={fromZipCode}
      onChange={(e) => setFromZipCode(e.target.value)}
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px', width: '180px', fontSize: '14px' }}
      
    />
    <div style={{ color: 'red',}}>{zipCodeError}</div>
</div>
    
    
<div>
<input
      type='text'
      placeholder="Enter To Zip Code"
      value={toZipCode}
      onChange={(e) => setToZipCode(e.target.value)}
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '180px', fontSize: '14px' }}
    />
    <div style={{ color: 'red',}}>{zipCodeError}</div>
</div>


  </div>
  <div className='radio-buttons' style={{ textAlign: 'right' }}>
    <label style={{ display: 'block', marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>
      <input
        type="radio"
        value="residential"
        checked={selectedOption === "residential"}
        onChange={() => setSelectedOption("residential")}
      />
      &nbsp; Residential
    </label>
    <label style={{ display: 'block', color: '#333', fontWeight: 'bold' }}>
      <input
        type="radio"
        value="commercial"
        checked={selectedOption === "commercial"}
        onChange={() => setSelectedOption("commercial")}
      />
      &nbsp; Commercial
    </label>
  </div>
  


</div>
)}

{showWightInput && (
  <div className='mt-2'>
  <p>Weight (including packaging)</p>
  <Select
    value={weightUnit}
    onChange={(selectedOption) => setWeightUnit(selectedOption)}
    options={weightUnitOptions}
    isSearchable
    placeholder="Select weight unit"
  />
</div>
)}
          <div className='mt-4'>
            <button className='btn btn-warning btn-lg paddingpcbtn' onClick={handleQuickQuoteClick}>
              Quick Quote
            </button>
          </div>

          <div className='mt-3'>
            <button className='btn btn-info btn-lg paddingpcbtn'>Create Level</button>
          </div>
        </div>

        <div className='paddingpc'>
          <h2 className='fw-bold fs-3 textinfo'>Package Type Makes Difference</h2>
          <p>By selecting the appropriate package type, you may frequently reduce delivery costs even more.</p>
          <p className='mt-3'>Ship Smart, Save More.</p>
        </div>
      </div>


{/* quote ship from */}

<div>
  
</div>


    </div>
  );
};

export default Ship;
