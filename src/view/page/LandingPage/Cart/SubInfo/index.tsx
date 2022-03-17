import { useAppSelector } from 'controllers/app/hooks';
import { getTotalAmount } from 'controllers/feature/product/productSlice';
import Divider from 'view/components/base/Divider';
import './style.css';
const SubInfo = () => {
  //Redux
  const totalAmount = useAppSelector(getTotalAmount);
  return (
    <div className="my-4 d-flex justify-content-end">
      <div className="subInfo-table">
        <div className="subInfo_column">
          <p>
            <b>Sub total:</b>
          </p>
          <Divider />
          <p>
            <b>VAT (20%):</b>
          </p>
          <Divider />
          <p>
            <b>Total:</b>
          </p>
        </div>
        <div className="subInfo_column">
          <p>${totalAmount.toFixed(2)}</p>
          <Divider />
          <p>${(totalAmount * 0.2).toFixed(2)}</p>
          <Divider />
          <p>${(totalAmount + (totalAmount * 0.2)).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SubInfo;
