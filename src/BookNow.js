import React, { useState } from 'react';
import axios from 'axios';
import './BookNow.css';

function BookNow() {
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

  const mockData = [
    {
      id: 1,
      name: 'Standard Single Room',
      capacity: 'Single',
      city: 'New York',
      hotelChain: 'Marriott',
      price: 150,
      rating: 3,
    },
    {
      id: 2,
      name: 'Deluxe Double Room',
      capacity: 'Double',
      city: 'Los Angeles',
      hotelChain: 'Hilton',
      price: 200,
      rating: 4,
    },
    {
      id: 3,
      name: 'Family Suite',
      capacity: 'Family',
      city: 'Chicago',
      hotelChain: 'InterContinental',
      price: 250,
      rating: 5,
    },
    {
      id: 4,
      name: 'Executive Suite',
      capacity: 'Suite',
      city: 'Houston',
      hotelChain: 'Hyatt',
      price: 250,
      rating: 4,
    },
    {
      id: 5,
      name: 'Economy Single Room',
      capacity: 'Single',
      city: 'New York',
      hotelChain: 'Holiday Inn',
      price: 100,
      rating: 2,
    },
    // Add more mock data as needed
  ];

  // Static options for the dropdowns
  const capacities = ['Single', 'Double', 'Suite', 'Family'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  const hotelChains = ['Marriott', 'Hilton', 'InterContinental', 'Hyatt'];
  const ratings = [1, 2, 3, 4, 5];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Clear previous results and errors
    setResults([]);
    setError('');

    // Simulate searching by filtering mockData based on criteria
    const searchResults = mockData.filter((room) => {
      return (
        (searchCriteria.capacity === '' || room.capacity === searchCriteria.capacity) &&
        (searchCriteria.city === '' || room.city === searchCriteria.city) &&
        (searchCriteria.hotelChain === '' || room.hotelChain === searchCriteria.hotelChain) &&
        (searchCriteria.rating === '' || room.rating >= parseInt(searchCriteria.rating))
      );
    });
    setTimeout(() => { // simulate a server response delay
      setResults(searchResults);
      setIsLoading(false);
    }, 1000);
  };


  return (
    <div className="BookNow">
      <h1>Book Now</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields for check-in and check-out dates */}
        {/* ... */}
        
        {/* Dropdown for capacity */}
        <label>
          Capacity:
          <select name="capacity" value={searchCriteria.capacity} onChange={handleInputChange}>
            <option value="">Select Capacity</option>
            {capacities.map((capacity, index) => (
              <option key={index} value={capacity}>{capacity}</option>
            ))}
          </select>
        </label>

        {/* Dropdown for city */}
        <label>
          City:
          <select name="city" value={searchCriteria.city} onChange={handleInputChange}>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </label>

        {/* Dropdown for hotel chain */}
        <label>
          Hotel Chain:
          <select name="hotelChain" value={searchCriteria.hotelChain} onChange={handleInputChange}>
            <option value="">Select Hotel Chain</option>
            {hotelChains.map((chain, index) => (
              <option key={index} value={chain}>{chain}</option>
            ))}
          </select>
        </label>

        {/* Dropdown for rating */}
        <label>
          Rating:
          <select name="rating" value={searchCriteria.rating} onChange={handleInputChange}>
            <option value="">Select Rating</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>{rating} Stars</option>
            ))}
          </select>
        </label>
        <div>
          <label>
            Minimum Price:
            <input
              type="number"
              name="priceMin"
              value={searchCriteria.priceMin}
              onChange={handleInputChange}
              placeholder="Minimum Price"
            />
          </label>
        </div>

        <div>
          <label>
            Maximum Price:
            <input
              type="number"
              name="priceMax"
              value={searchCriteria.priceMax}
              onChange={handleInputChange}
              placeholder="Maximum Price"
            />
          </label>
        </div>

        <button type="submit" disabled={isLoading}>Search</button>
      </form>
      
      <div className="results">
        {!isLoading && results.length > 0 ? (
          results.map(room => (
            <div key={room.id} className="result-item">
              <h3>{room.name}</h3>
              <p>City: {room.city}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Hotel Chain: {room.hotelChain}</p>
              <p>Price: ${room.price}</p>
              <p>Rating: {room.rating} stars</p>
            </div>
          ))
        ) : !isLoading && <p>No rooms found with the given criteria.</p>}
      </div>

      {isLoading && <p>Loading...</p>}
    </div>
    
  );
}

export default BookNow;
