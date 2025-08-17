import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get query params
  const treatment = query.get('treatment') || '';
  const district = query.get('district') || '';
  const hospitalType = query.get('hospitalType') || '';

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/search', {
          params: { treatment, district, hospitalType }
        });
        setResults(res.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      }
      setLoading(false);
    }

    // Fetch results if any filter is provided, or fetch all if none provided
    if (treatment || district || hospitalType) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [treatment, district, hospitalType]);

  return (
    <div>
      <h2>Treatment Hospital Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      {!loading && results.length > 0 && (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Treatment</th>
              <th>District</th>
              <th>Availability</th>
              <th>Hospital Type</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {results.map(item => (
              <tr key={item._id || item.id}>
                <td>{item.hospitalName}</td>
                <td>{item.treatment || item.treatmentName || item.name}</td>
                <td>{item.district}</td>
                <td>{item.availability}</td>
                <td>{item.hospitalType}</td>
                <td>{item.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchResults;
