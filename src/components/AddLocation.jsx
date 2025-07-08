import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

function AddLocation() {
  const [locationFilterVisible, setLocationFilterVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const availableLocations = ['Rawalpindi', 'Islamabad', 'Lahore', 'Karachi'];

  const toggleLocationFilter = () => {
    setLocationFilterVisible(!locationFilterVisible);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    console.log('Selected Location:', event.target.value);
  };

  return (
    <div>
      {/* Location Label */}
      <div>
        <FaMapMarkerAlt style={{ marginRight: '5px' }} />
        <span>Current Location: Rawalpindi, Punjab, Pakistan</span>
      </div>

      {/* Location Filter */}
      <div style={{ marginTop: '10px' }}>
        <FiFilter
          style={{ marginRight: '5px', cursor: 'pointer' }}
          onClick={toggleLocationFilter}
        />
        <label htmlFor="locationFilter" style={{ cursor: 'pointer' }} onClick={toggleLocationFilter}>
          Filter by Location
        </label>
        {locationFilterVisible && (
          <select id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
            <option value="">All Locations</option>
            {availableLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default AddLocation;