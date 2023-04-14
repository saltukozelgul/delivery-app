import React from 'react';
import MapComponent from './components/MapComponent';
import OrderCard from './components/OrderCard';
import Snackbar from './components/Snackbar';

function App() {
  const courierLocation = [39.96697195133853, 32.793047525513884];
  const customerLocation = [39.9623, 32.7868];
  const order = {
    price: "",
    time: '12:30',
    picture: 'https://www.nicepng.com/png/detail/253-2538919_motorcycle-courier-euclidean-vector-courier-vector-png.png',
    esttime: '15 dk'
  };

  return (
    <div className="main-content">
      {/* <Snackbar message="Kötü hava şartlarından dolayı siparişinizde gecikmeler yaşanabilir. Bunun için üzgünüz." />*/}
       <MapComponent
        courierLocation={courierLocation}
        customerLocation={customerLocation}
      />
     <OrderCard price={order.price} time={order.time} image={order.picture} esttime={order.esttime} />
    </div>
  );
}

export default App;
