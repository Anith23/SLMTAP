import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

function TreatmentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/search', {
        params: { treatment: searchTerm }
      });

      console.log('API response data:', res.data);

      if (!res.data || res.data.length === 0) {
        setResults([]);
        setMessage('No results found for your search.');
      } else {
        setMessage('');
        const mappedResults = res.data.map(item => ({
          hospital: item.hospitalName || item.hospital || 'N/A',
          treatment: item.treatmentName || item.name || 'N/A',
          contact: item.contact || 'N/A'
        }));
        setResults(mappedResults);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setMessage('Search failed. Please try again later.');
      setResults([]);
    }
  };

  return (
    <div>
      <h2>Search Treatments</h2>
      <input
        type="text"
        placeholder="Search by Treatment Name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {message && <p>{message}</p>}
      <SearchResults results={results} />
    </div>
  );
}

export default TreatmentSearch;
