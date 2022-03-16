import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { getCartItems, productActions } from 'controllers/feature/product/productSlice';
import { GrUpdate } from 'react-icons/gr';
import { GiCancel } from 'react-icons/gi';
import Input from 'view/components/base/Input';
import './style.css';
import { MutableRefObject, useRef } from 'react';
import { ICartItem } from 'models';
import Accordion from './Accordion';

const Checkout = () => {
  //Redux
  const dispatch = useAppDispatch();
  const CartItems = useAppSelector(getCartItems);
  //Ref
  const amountProductRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;

  const doUpdateAmount = (item: ICartItem) => {
    dispatch(productActions.addItemIntoCart({ ...item, amount: +amountProductRef.current.value }));
  };

  return (
    <div className="container-fluid py-3 checkout">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {CartItems &&
            CartItems.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img src={item.imgUrl} alt="Product" width="100%" height="120px" />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <div className="row">
                      <div className="col-2">
                        <Input
                          ref={amountProductRef}
                          input={{
                            type: 'number',
                            defaultValue: item.amount,
                          }}
                        />
                      </div>
                      <span
                        className="col-1 table-icons"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Update"
                        onClick={() => doUpdateAmount(item)}
                      >
                        <GrUpdate />
                      </span>
                      <span
                        className="col-2 table-icons"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Remove"
                      >
                        <GiCancel />
                      </span>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>${(item.amount * item.price).toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <h2>
          <b>What would you like to do next?</b>
        </h2>
        <p>
          Choose if you have a discount code or reward points you want to use or would like to
          estimate your delivery cost.
        </p>
      </div>
      <Accordion />
    </div>
  );
};

export default Checkout;
