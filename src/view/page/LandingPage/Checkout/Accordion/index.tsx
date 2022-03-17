import Input from 'view/components/base/Input';
import CheckoutOptions from './CheckoutOptions';
import './style.css';

const Accordion = () => {
  const element = [
    {
      id: 'headingOne',
      collapsed: 'collapseOne',
      expanded: true,
      title: 'Step 1: Checkout Options',
      onShow: 'show',
      component: <CheckoutOptions />
    },
    {
      id: 'headingTwo',
      collapsed: 'collapseTwo',
      expanded: false,
      title: 'Step 2: Account & Billing Details',
    },
    {
      id: 'headingThree',
      collapsed: 'collapseThree',
      expanded: false,
      title: 'Step 3: Delivery Details',
    },
    {
      id: 'headingFour',
      collapsed: 'collapseFour',
      expanded: false,
      title: 'Step 4: Delivery Method',
    },
    {
      id: 'headingFive',
      collapsed: 'collapseFive',
      expanded: false,
      title: 'Step 5: Payment Method',
    },
    { id: 'headingSix', collapsed: 'collapseSix', expanded: false, title: 'Step 6: Confirm Order' },
  ];
  return (
    <div className="accordion my-5" id="accordionExample">
      {element.map((el) => {
        return (
          <div className="accordion-item">
            <h2 className="accordion-header" id={el.id}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${el.collapsed}`}
                aria-expanded={el.expanded}
                aria-controls={el.collapsed}
              >
                {el.title}
              </button>
            </h2>
            <div
              id={el.collapsed}
              className={`accordion-collapse collapse ${el.onShow}`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body coupon-style">
                {el.component}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
