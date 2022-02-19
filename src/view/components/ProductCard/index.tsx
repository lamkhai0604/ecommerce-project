import { ReactNode } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
// import Popup from './Popup';
import './style.css';

interface IProductCardProps {
  shadow?: boolean;
  imgUrl?: string;
  name?: string;
  grey?: boolean;
  price?: number;
  oldPrice?: number;
  children?: ReactNode;
}

const ProductCard = (props: IProductCardProps) => {
  return (
    <div className={`cardpage ${props.shadow && 'box-shadow'}`}>
      <div className="cardpage-body">
        <img src={props.imgUrl} alt={props.name} width="270" height="360" />
        {/* <Popup clsName="popup" /> */}
      </div>
      <div className={`cardpage-footer ${props.grey && 'bgc-grey'}`}>
        <div>
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </div>
        <p>Lorem ipsum dolor sit amet</p>
        <div className="footer-price">
          <span className="price-new">${props.price}</span>
          {props.oldPrice ? <span className="price-old">$90.00</span> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
