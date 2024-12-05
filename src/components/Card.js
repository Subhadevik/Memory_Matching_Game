import React from 'react';
import './Card.css';

const Card = ({ id, emoji, flipped, matched, onClick }) => {
  return (
    <div className={`card ${flipped || matched ? 'flipped' : ''}`} onClick={() => onClick(id)}>
      <div className="card-inner">
        <div className="card-front">
          {/* Initially blank */}
        </div>
        <div className="card-back">
          {/* Show emoji after flip */}
          {emoji}
        </div>
      </div>
    </div>
  );
};

export default Card;
