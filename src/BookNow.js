import React, { useState } from 'react';
import axios from 'axios';
import './BookNow.css';

function BookNow() {
 <div>Book Now Page</div>;  
  const [searchCriteria, setSearchCriteria] = useState({
    check_in_date: '',
    check_out_date: '',
    capacity: '',
    city: '',
    hotelChain: '',
    rating: '',
    priceMin: '',
    priceMax: '',
  });

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:3000/api/rooms/search', { params: searchCriteria });
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
        <input type="date" name="check_in_date" value={searchCriteria.check_in_date} onChange={handleInputChange} placeholder="Check-in Date" />
        <input type="date" name="check_out_date" value={searchCriteria.check_out_date} onChange={handleInputChange} placeholder="Check-out Date" />
        <input type="text" name="capacity" value={searchCriteria.capacity} onChange={handleInputChange} placeholder="Capacity (e.g., single, double)" />
        <input type="text" name="city" value={searchCriteria.city} onChange={handleInputChange} placeholder="City" />
        <input type="text" name="hotelChain" value={searchCriteria.hotelChain} onChange={handleInputChange} placeholder="Hotel Chain" />
        <input type="number" name="rating" value={searchCriteria.rating} onChange={handleInputChange} placeholder="Minimum Rating" />
        <input type="number" name="priceMin" value={searchCriteria.priceMin} onChange={handleInputChange} placeholder="Minimum Price" />
        <input type="number" name="priceMax" value={searchCriteria.priceMax} onChange={handleInputChange} placeholder="Maximum Price" />
        <button type="submit" disabled={isLoading}>Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length > 0 ? (
        <div className="results">
          {results.map((room) => (
            <div key={room.room_id} className="room">
              <p>Room ID: {room.room_id}</p>
              <p>Price: {room.price}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Hotel Chain: {room.chain_name}</p>
              <p>City: {room.city_name}</p>
              <p>Rating: {room.rating}</p>
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
