import no_image from 'assets/images/no_img.png';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import Popup from './Popup';
import StarRating from './StarRating';
import './style.css';

interface IProductCardProps {
  id?: string;
  shadow?: boolean;
  imgUrl?: string;
  name?: string;
  clsName?: string;
  discount?: number;
  newArrival?: boolean;
  grey?: boolean;
  bottom?: boolean;
  price?: number;
  starRating?: number;
  oldPrice?: number;
  children?: ReactNode;
}

const ProductCard = (props: IProductCardProps) => {
  // document.getElementById("topUpHandler")?.addEventListener('mouseover', () => {
  //   document.getElementById("topUpHandler")?.style.
  // });
  const [imgUrl, setImgUrl] = useState<string>('');
  // const navigate = useNavigate();
  let to = `product/${props.id}?name=${props.name}`
  // if (!to) navigate(`product/${props.id}?name=${props.name}`)

  useEffect(() => {
    setTimeout(() => {
      if (props.imgUrl) setImgUrl(props.imgUrl);
      else setImgUrl(no_image);
    }, 5000);
  }, [props.imgUrl]);

  return (
    <Link
      to={to}
      className={`cardpage ${props.clsName} ${props.shadow && 'box-shadow'}`}
    >
      <div id="topUpHandler" className="cardpage-body">
        <div className="cardpage-body_badge">
          {props.discount && <Badge />}
          {props.newArrival && <Badge />}
        </div>
        <img src={imgUrl} alt={props.name} width="270" height="360" />
        <Popup clsName="popup" />
      </div>
      <div className={`cardpage-footer ${props.bottom && 'mb-4'} ${props.grey && 'bgc-grey'}`}>
        <StarRating starRating={props.starRating} />
        <p>{props.name}</p>
        <div className="footer-price">
          <span className="price-new">${props.price}.00</span>
          {props.oldPrice ? <span className="price-old">$90.00</span> : null}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
