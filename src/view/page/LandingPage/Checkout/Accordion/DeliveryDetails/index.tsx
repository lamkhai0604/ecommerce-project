import Button from 'view/components/base/Button';
import Input from 'view/components/base/Input';
import Radio from 'view/components/base/Radio';
import "./style.css"

const DeliveryDetails = () => {
  return (
    <div className="container-fluid w-100 delivery-details">
      <Radio label="I want to use an existing address" checked={true} />
      <Input input={{ type: 'text'}} />
      <Radio label="I want to use a new address" />
      <div className="d-flex justify-content-end">
        <Button radius>Continue</Button>
      </div>
    </div>
  );
};

export default DeliveryDetails;
