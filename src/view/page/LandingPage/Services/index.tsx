import { FaShippingFast } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { MdOutlineSupportAgent } from 'react-icons/md';
import './style.css';

const Services = () => {
  return (
    <div className="container-fluid">
      <div className="services">
        <div className="services-icons">
          <span><FaShippingFast /></span>
          <h5>FREE SHIPPING WORLDWIDE</h5>
          <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
        </div>
        <div className="services-icons">
            <span><GiTakeMyMoney /></span>
          <h5>MONEY BACK GUARANTEE</h5>
          <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
        </div>
        <div className="services-icons">
            <span><MdOutlineSupportAgent /></span>
          <h5>ONLINE SUPPORT 24/7</h5>
          <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
