import React, { useState } from 'react';
import './RentNow.css'; // Make sure this CSS file exists and contains the styles you need

function RentNow() {
  const [searchCriteria, setSearchCriteria] = useState({
    startDate: '',
    endDate: '',
    capacity: '',
    area: '',
    hotelChain: '',
    category: '',
    totalRooms: '',
    priceRange: {
      min: '',
      max: '',
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      priceRange: {
        ...searchCriteria.priceRange,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would handle the search logic here, possibly making an API call to your backend
    console.log('Search Criteria:', searchCriteria);
    // TODO: Search for available rooms with these criteria
  };

  return (
    <div className="RentNow">
      <h1>Rent Now</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="date" name="startDate" value={searchCriteria.startDate} onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={searchCriteria.endDate} onChange={handleInputChange} />
        </label>
        <label>
          Capacity:
          <input type="number" name="capacity" value={searchCriteria.capacity} onChange={handleInputChange} />
        </label>
        <label>
          Area:
          <input type="text" name="area" value={searchCriteria.area} onChange={handleInputChange} />
        </label>
        <label>
          Hotel Chain:
          <input type="text" name="hotelChain" value={searchCriteria.hotelChain} onChange={handleInputChange} />
        </label>
        <label>
          Category:
          <select name="category" value={searchCriteria.category} onChange={handleInputChange}>
            {/* Insert category options here */}
          </select>
        </label>
        <label>
          Total Number of Rooms in Hotel:
          <input type="number" name="totalRooms" value={searchCriteria.totalRooms} onChange={handleInputChange} />
        </label>
        <div className="price-range">
          <label>
            Min Price:
            <input type="number" name="min" value={searchCriteria.priceRange.min} onChange={handlePriceChange} />
          </label>
          <label>
            Max Price:
            <input type="number" name="max" value={searchCriteria.priceRange.max} onChange={handlePriceChange} />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default RentNow;
