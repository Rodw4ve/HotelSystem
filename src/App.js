import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';

function App() {
  // Expanded dummy data
  const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Berlin', 'Amsterdam'];
  const hotelChains = ['Marriott', 'Hilton', 'Hyatt', 'Sheraton', 'Ibis', 'Ritz-Carlton'];
  const availabilities = ['Available Now', 'Check Availability', 'Sold Out'];
  const capacities = ['Single Room', 'Double Room', 'Suite', 'Family Room'];
  const ratings = ['5-star', '4-star', '3-star', '2-star'];

  // State for price filter
  const [priceRange, setPriceRange] = useState({ min: 50, max: 500 });

  // Handler for price range change
  const handlePriceChange = (event) => {
    setPriceRange({ ...priceRange, [event.target.name]: event.target.value });
  };

  return (
    <div className="App">
      <Navbar />

      <div>
        <h1>Welcome to our Hotel Booking Platform</h1>
        
        <div>
          <h2>Explore by City</h2>
          <ul>
            {cities.map(city => (
              <li key={city}><a href={`/hotels?city=${city}`}>{city}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Explore by Hotel Chain</h2>
          <ul>
            {hotelChains.map(chain => (
              <li key={chain}><a href={`/hotels?chain=${chain}`}>{chain}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Explore by Availability</h2>
          <ul>
            {availabilities.map(availability => (
              <li key={availability}><a href={`/hotels?availability=${availability}`}>{availability}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Explore by Capacity</h2>
          <ul>
            {capacities.map(capacity => (
              <li key={capacity}><a href={`/hotels?capacity=${capacity}`}>{capacity}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Explore by Rating</h2>
          <ul>
            {ratings.map(rating => (
              <li key={rating}><a href={`/hotels?rating=${rating}`}>{rating}</a></li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div>
          <h2>Filter by Price</h2>
          <label>
            Min Price:
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              style={{ margin: '0 10px' }}
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
