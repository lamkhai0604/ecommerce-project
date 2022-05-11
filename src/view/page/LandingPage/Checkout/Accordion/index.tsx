import { useState } from 'react';
import AccountBill from './AccountBill';
import CheckoutOptions from './CheckoutOptions';
import ConfirmOrder from './ConfirmOrder';
import DeliveryDetails from './DeliveryDetails';
import DeliveryMethod from './DeliveryMethod';
import PaymentMethod from './PaymentMethod';
import './style.css';

const Accordion = () => {
  const [showCompTwo, setShowCompTwo] = useState('');

  const doNextStep = (id: string) => {
    setShowCompTwo(id || 'collapseTwo');
  };

  return (
    <div className="accordion my-5" id="accordionExample">
      {/* Step 1 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={`accordion-button ${showCompTwo ? "collapsed" : ''}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Step 1: Checkout Options
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${showCompTwo ? "" : "show"}`}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <CheckoutOptions doNextStep={doNextStep.bind(this)} />
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`${showCompTwo ? "#collapseTwo" : ""}`}
            aria-expanded={showCompTwo ? true : false}
            aria-controls="collapseTwo"
          >
            Step 2: Account &#38; Billing Details
          </button>
        </h2>
        <div
          id="collapseTwo"
          className={`accordion-collapse collapse ${showCompTwo ? "show" : ""}`}
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <AccountBill />
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Step 3: Delivery Details
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <DeliveryDetails />
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFour">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            Step 4: Delivery Method
          </button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <DeliveryMethod />
          </div>
        </div>
      </div>

      {/* Step 5 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFive">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            Step 5: Payment Method
          </button>
        </h2>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <PaymentMethod />
          </div>
        </div>
      </div>

      {/* Step 6*/}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingSix">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSix"
            aria-expanded="false"
            aria-controls="collapseSix"
          >
            Step 6: Confirm Order
          </button>
        </h2>
        <div
          id="collapseSix"
          className="accordion-collapse collapse"
          aria-labelledby="headingSix"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <ConfirmOrder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
