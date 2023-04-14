import React from 'react';
import infoThumb from '../assets/info_thumb.png';

function OrderCard(props) {
  const { price, time, image, esttime } = props;

  return (
    <div className="order-card">
      <div className="order-card__image-container">
        <img className="order-card__image" src={infoThumb} alt="Food" />
      </div>
      <div className="order-card__info">
        <h3 className="order-card__title">Siparişiniz yolda...</h3>
        <p className="order-card__price">{price}</p>
        <p className="order-card__time">Sipariş Tarihi: {time}</p>
        <p className="order-card__estimated-time">Tahmini Varış: {esttime}</p>
      </div>
    </div>
  );
}

export default OrderCard;
