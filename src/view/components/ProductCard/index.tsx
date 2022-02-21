import { ReactNode, useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Badge from './Badge';
import StarRating from './StarRating';
// import Popup from './Popup';
import './style.css';

interface IProductCardProps {
  shadow?: boolean;
  imgUrl?: string;
  name?: string;
  grey?: boolean;
  bottom?: boolean;
  price?: number;
  starRating?: number;
  oldPrice?: number;
  children?: ReactNode;
}

const ProductCard = (props: IProductCardProps) => {
  return (
    <div className={`cardpage ${props.shadow && 'box-shadow'}`}>
      <div className="cardpage-body">
        <div className="cardpage-body_badge">
          <Badge />
          <Badge />
        </div>
        <img src={props.imgUrl} alt={props.name} width="270" height="360" />
        {/* <Popup clsName="popup" /> */}
      </div>
      <div className={`cardpage-footer ${props.bottom && 'mb-4'} ${props.grey && 'bgc-grey'}`}>
        <StarRating starRating={props.starRating} />
        <p>{props.name}</p>
        <div className="footer-price">
          <span className="price-new">${props.price}.00</span>
          {props.oldPrice ? <span className="price-old">$90.00</span> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
