import Button from 'view/components/base/Button';
import Radio from 'view/components/base/Radio';
import "./style.css";

const PaymentMethod = () => {
  return (
    <div className="container-fluid w-100 delivery-method">
      <p>Please select the preferred payment method to use on this order.</p>
      <Radio label="Cash On Delivery" checked={true} />
      <p className="mt-3">
        <b>Add Comments About Your Order</b>
      </p>
      <textarea></textarea>
      <div className="d-flex justify-content-end">
        <Button radius>Continue</Button>
      </div>
    </div>
  );
};

export default PaymentMethod;