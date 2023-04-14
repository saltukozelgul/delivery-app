import React from 'react';
import MapComponent from './components/MapComponent';
import OrderCard from './components/OrderCard';

function App() {
  const courierLocation = [51.505, -0.09];
  const customerLocation = [51.51, -0.1];
  const order = {
    price: 10,
    time: '12:30 PM',
    picture: 'https://www.example.com/order.jpg',
  };

  return (
    <div className="main-content">
      <MapComponent
        courierLocation={courierLocation}
        customerLocation={customerLocation}
      />
     <OrderCard price={order.price} time={order.time} image={order.picture} />
    </div>
  );
}

export default App;
