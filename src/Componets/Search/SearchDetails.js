import React from 'react';
import { useParams } from 'react-router-dom';

const SearchDetails = () => {
  // Use the useParams hook to get the trackingNumber from the URL
  const { trackingNumber } = useParams();

  // You can use the trackingNumber to fetch and display relevant information
  // For now, let's just display the tracking number
  return (
    <div>
      <h1>Search Details Page</h1>
      <p>Tracking Number: {trackingNumber}</p>
      {/* Add more details based on your actual implementation */}
    </div>
  );
};

export default SearchDetails;
