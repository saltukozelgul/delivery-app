import React from 'react';
import CustomAlert from './components/CustomAlert';
import MapComponent from './components/MapComponent';

function App() {
  const courierLocation = [39.96697195133853, 32.793047525513884];
  const customerLocation = [39.9623, 32.7868];
  // Defining the order object
  const order = {
    price: "",
    time: "12:30",
    esttime: "15 dk",
  };

  return (
    <div className="main-content">
      <CustomAlert message="Kötü hava şartlarından ötürü siparişlerde gecikmeler yaşanabilir." />
       <MapComponent
        price = {order.price}
        time = {order.time}
        esttime = {order.esttime}
        courierLocation={courierLocation}
        customerLocation={customerLocation}
      />
    </div>
  );
}

export default App;
