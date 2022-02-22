import Button from '../Button';
import Input from '../Input';
import './style.css'

const Subscribers = () => {
  return (
    <div className="subscribers">
      <p>Special ofers for subscribers</p>
      <h3>Ten percent member discount</h3>
      <div className="subscribers-inputGroup">
        <Input />
        <span />
        <Button inverse>Subscribe</Button>
      </div>
    </div>
  );
};

export default Subscribers;
