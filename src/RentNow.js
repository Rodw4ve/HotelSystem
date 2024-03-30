import React, { useState } from 'react';
import axios from 'axios';
import './BookNow.css';

function BookNow() {
  // Initialize search criteria state
  const [searchCriteria, setSearchCriteria] = useState({
    startDate: '',
    endDate: '',
    capacity: '',
    area: '', // Assume we need to specify an area or city where the hotel is located
    hotelChain: '',
    category: '', // Assume we have categories or types of rooms to choose from
    priceMin: '',
    priceMax: '',
  });

  // State to hold the search results and loading/error states
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes for the search form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  // Function to handle form submission and make the search request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Assuming your backend is running on localhost:5000 and you've set up proxying for the /api prefix
      const response = await axios.get('/api/rooms/search', {
        params: searchCriteria,
      });
      setResults(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="BookNow">
      <h1>Book Now</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields for search criteria */}
        {/* Assuming you have corresponding state properties and handlers for each */}
        {/* ... */}
        <button type="submit" disabled={isLoading}>Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length > 0 ? (
        <div className="results">
          {results.map(room => (
            <div key={room.id} className="room">
              {/* Display room details here */}
              <p>{room.name} - {room.description}</p>
              {/* Add more room details and possibly a booking button */}
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p>No rooms found with the given criteria.</p>
      )}
    </div>
  );
}

export default BookNow;
