// Homepage.js
import React from 'react';

const Homepage = () => {
  // Dummy data for navigation options
  const cities = ['New York', 'London', 'Paris', 'Tokyo'];
  const hotelChains = ['Marriott', 'Hilton', 'Hyatt', 'Sheraton'];
  const availabilities = ['Available Now', 'Check Availability'];
  const capacities = ['Single Room', 'Double Room', 'Suite'];
  const ratings = ['5-star', '4-star', '3-star'];

  return (
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
    </div>
  );
}

export default Homepage;
