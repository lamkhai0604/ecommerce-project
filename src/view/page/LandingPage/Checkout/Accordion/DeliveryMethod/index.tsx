import Button from 'view/components/base/Button';
import Radio from 'view/components/base/Radio';
import "./style.css";

const DeliveryMethod = () => {
  return (
    <div className="container-fluid w-100 delivery-method">
      <p>Please select the preferred shipping method to use on this order.</p>
      <p>
        <b>Flat Rate</b>
      </p>
      <Radio label="Flat Shipping Rate - $5.00" />
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

export default DeliveryMethod;
