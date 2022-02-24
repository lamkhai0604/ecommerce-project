import { useAppSelector } from 'controllers/app/hooks';
import { getCartItems, getTotalAmount } from 'controllers/feature/product/productSlice';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Product from './Product';
import './style.css';

const CartBody = () => {
  //Redux
  const CartItems = useAppSelector(getCartItems);
  const totalAmount = useAppSelector(getTotalAmount);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        {CartItems.length > 0 ? (
          <>
            <div className="cartItems-product">
              {CartItems.map((item) => {
                return (
                  <Product key={item.id} imgUrl={item.imgUrl} name={item.name} amount={item.amount} price={item.price} />
                );
              })}
            </div>

            <Divider />

            <div className="cartItems-amount">
              <div className="cartItems-amount_subTotal">
                <span>Sub Total</span>
                <span>{`$${totalAmount.toFixed(2)}`}</span>
              </div>
              <div className="cartItems-amount_total">
                <span>Total</span>
                <span style={{ color: '#ff0055' }}>{`$${totalAmount.toFixed(2)}`}</span>
              </div>
            </div>

            <Divider />

            <div className="cartItems-btnGroup">
              <Button inverse data-bs-dismiss="offcanvas" aria-label="Close">
                Close
              </Button>
              <Button clsName="btn-order" inverse data-bs-dismiss="offcanvas" aria-label="Close">
                Order
              </Button>
            </div>
          </>
        ) : (
          <span className="empty-cart">Your shopping cart is empty!</span>
        )}
      </div>
    </div>
  );
};

export default CartBody;
