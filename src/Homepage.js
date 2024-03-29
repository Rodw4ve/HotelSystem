import React, { useState } from 'react';
import Navbar from './Navbar';
import './Homepage.css'; // Ensure this points to the right CSS file for your Homepage

function Homepage() {
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
    <div className="Homepage">
      <header className="Homepage-header">
        <h1>Welcome to e-Hotels</h1>
        <p>Discover your perfect stay with us. Explore a world of luxury, comfort, and convenience.</p>
      </header>

      <main>
        <section className="explore-options">
          <h2>Explore by City</h2>
          <ul>
            {cities.map(city => (
              <li key={city}><a href={`/hotels?city=${city}`}>{city}</a></li>
            ))}
          </ul>

          <h2>Explore by Hotel Chain</h2>
          <ul>
            {hotelChains.map(chain => (
              <li key={chain}><a href={`/hotels?chain=${chain}`}>{chain}</a></li>
            ))}
          </ul>

          <h2>Explore by Availability</h2>
          <ul>
            {availabilities.map(availability => (
              <li key={availability}><a href={`/hotels?availability=${availability}`}>{availability}</a></li>
            ))}
          </ul>

          <h2>Explore by Capacity</h2>
          <ul>
            {capacities.map(capacity => (
              <li key={capacity}><a href={`/hotels?capacity=${capacity}`}>{capacity}</a></li>
            ))}
          </ul>

          <h2>Explore by Rating</h2>
          <ul>
            {ratings.map(rating => (
              <li key={rating}><a href={`/hotels?rating=${rating}`}>{rating}</a></li>
            ))}
          </ul>

          <div className="price-filter">
            <h2>Filter by Price</h2>
            <label>
              Min Price:
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
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
        </section>

        <section className="guided-actions">
          <button onClick={() => alert('Search functionality coming soon!')}>Search Rooms</button>
          <button onClick={() => alert('Booking management coming soon!')}>Manage Booking</button>
          <button onClick={() => alert('Exploration functionality coming soon!')}>Explore Locations</button>
        </section>
      </main>

      <footer className="Homepage-footer">
        <p>Contact Us: info@e-hotels.com | 1-800-123-4567</p>
        <p>Find answers to your questions in our <a href="/faq">FAQ</a> section or read our <a href="/privacy-policy">Privacy Policy</a>.</p>
      </footer>
    </div>
  );
}

export default Homepage;
