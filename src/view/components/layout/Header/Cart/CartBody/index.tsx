import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import {
  getCartItems,
  getTotalAmount,
  productActions,
} from 'controllers/feature/product/productSlice';
import { ICartItem } from 'models';
import { Link } from 'react-router-dom';
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

  const doDeleteItemFromCart = (id: string) => {
    if (id) {
      let newCart = CartItems.filter((v) => v.id !== id)
      dispatch(productActions.deleteItemCart(newCart as ICartItem[]));
    };
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
        {CartItems.length > 0 ? (
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
                    onDelete={doDeleteItemFromCart.bind(null, item.id)}
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
              <div className="cartItems-amount_subTotal">
                <span>VAT (20%)</span>
                <span>{`$${(totalAmount * 0.2).toFixed(2)}`}</span>
              </div>
              <div className="cartItems-amount_total mt-2">
                <span>Total</span>
                <span style={{ color: '#ff0055' }}>{`$${(
                  totalAmount +
                  (totalAmount - totalAmount * 0.8)
                ).toFixed(2)}`}</span>
              </div>
            </div>

            <Divider />

            <div className="cartItems-btnGroup mt-3">
              <Link to="index/route=cart" className="btn-viewCart">
                <span>View cart</span>
              </Link>
              <Link to="index/route=cart/checkout" className="btn-checkOut">
                <span>Check out</span>
              </Link>
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
