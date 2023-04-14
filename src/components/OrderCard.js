import React from 'react';

function OrderCard(props) {
  const { price, time, image } = props;

  return (
    <div className="order-card">
      <div className="order-card__image-container">
        <img className="order-card__image" src={image} alt="Food" />
      </div>
      <div className="order-card__info">
        <p className="order-card__price">{price}</p>
        <p className="order-card__time">{time}</p>
      </div>
    </div>
  );
}

export default OrderCard;
