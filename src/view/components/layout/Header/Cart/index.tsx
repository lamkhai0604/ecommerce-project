import { useAppSelector } from 'controllers/app/hooks';
import { getCartItems } from 'controllers/feature/product/productSlice';
import { useEffect, useState } from 'react';
import { ImCart } from 'react-icons/im';
import CartBody from './CartBody';
import './style.css';

const Cart = () => {
  //Redux
  const CartItems = useAppSelector(getCartItems);
  //State
  const [btnHightLight, setBtnHighLight] = useState<boolean>(false);

  const numberCartItems = CartItems.reduce((total, currentValue) => {
    return total + currentValue.amount;
  }, 0);

  useEffect(() => {
    if (CartItems.length === 0) return;
    setBtnHighLight(true);

    let timer = setTimeout(() => setBtnHighLight(false), 300);

    return () => clearTimeout(timer);
  }, [CartItems]);

  return (
    <>
      <span
        className={`header-setting_cart ${btnHightLight && 'bump'}`}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <ImCart />
        <span>{numberCartItems}</span>
      </span>

      <CartBody />
    </>
  );
};

export default Cart;
