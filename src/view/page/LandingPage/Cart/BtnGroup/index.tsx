import Button from 'view/components/base/Button';
import './style.css'

const BtnGroup = () => {
  return (
    <div className="mb-5 btnGroup">
      <Button>Continue Shopping</Button>
      <Button to="checkout">Checkout</Button>
    </div>
  );
};

export default BtnGroup;
