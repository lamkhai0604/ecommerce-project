import Divider from 'view/components/base/Divider';
import Banner from 'view/components/layout/Banner';
import Subscribers from 'view/components/layout/Subscribers';
import Accordion from './Accordion';
import './style.css';

const Checkout = () => {
  return (
    <>
      <Banner title="Checkout" name="Shopping Cart" subName="Checkout" clsName="checkout-banner" />
      <div className="container-fluid checkout">
        <Accordion />

        <Divider />

        <Subscribers />
      </div>
    </>
  );
};

export default Checkout;
