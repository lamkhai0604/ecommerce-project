import Divider from 'view/components/base/Divider';
import Banner from 'view/components/layout/Banner';
import Accordion from './Accordion';
import './style.css';

const Checkout = () => {
  return (
    <>
      <Banner title="Checkout" name="Shopping Cart" subName="Checkout" clsName="checkout-banner" />
      <div className="container-fluid checkout">
        <Accordion />

        <Divider />
      </div>
    </>
  );
};

export default Checkout;
