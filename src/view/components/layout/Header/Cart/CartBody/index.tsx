import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { getCartItems, getTotalAmount, productActions } from 'controllers/feature/product/productSlice';
import { ICartItem } from 'models';
import Button from 'view/components/base/Button';
import Divider from 'view/components/base/Divider';
import Product from './Product';
import './style.css';

const CartBody = () => {
  //Redux
  const dispatch = useAppDispatch();
  const CartItems = useAppSelector(getCartItems);
  const totalAmount = useAppSelector(getTotalAmount);

  const doAddItemToCart = (item: ICartItem) => {
    if (item) dispatch(productActions.addItemIntoCart({ ...item, amount: 1 }));
  };

  const doRemoveItemToCart = (id: string) => {
    if (id) dispatch(productActions.removeItemCart(id));
  };

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
        {CartItems && totalAmount > 0 ? (
          <>
            <div className="cartItems-product mb-3">
              {CartItems.map((item) => {
                return (
                  <Product
                    key={item.id}
                    id={item.id}
                    imgUrl={item.imgUrl}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={doAddItemToCart.bind(null, item)}
                    onRemove={doRemoveItemToCart.bind(null, item.id)}
                  />
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

            <div className="cartItems-btnGroup mt-3">
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
