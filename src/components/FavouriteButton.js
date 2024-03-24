import React, { useState } from 'react';

const FavoriteButton = ({ isFavorite, toggleFavorite }) => {

  const handleClick = () => {
    toggleFavorite();
  };

  return (
    <button onClick={handleClick}>
      <i
        className={`far fa-heart ${isFavorite ? 'fas fa-heart-fill' : ''}`}
        style={{ color: 'red' }}
      />
    </button>
  );
};

export default FavoriteButton;