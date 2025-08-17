import React, { useState } from 'react';

const SearchForm = ({ setResults }) => {
  const [district, setDistrict] = useState('');
  const [hospitalType, setHospitalType] = useState('');
  const [treatmentType, setTreatmentType] = useState('');

  const handleSearch = async () => {
    const response = await fetch('http://localhost:5000/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ district, hospitalType, treatmentType }),
    });

    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Search Hospital or Treatment</h3>
      <div>
        <label>District:</label>
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Trincomalee">Trincomalee</option>
        </select>
      </div>

      <div>
        <label>Hospital Type:</label>
        <select value={hospitalType} onChange={(e) => setHospitalType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Teaching">Teaching</option>
        </select>
      </div>

      <div>
        <label>Treatment Type:</label>
        <select value={treatmentType} onChange={(e) => setTreatmentType(e.target.value)}>
          <option value="">Select Treatment</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dental">Dental</option>
          <option value="Surgery">Surgery</option>
        </select>
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;
