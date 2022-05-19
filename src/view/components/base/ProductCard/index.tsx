import no_image from 'assets/images/no_img.png';
import React, { ReactNode, useEffect, useState } from 'react';
import Badge from './Badge';
import Popup from './Popup';
import StarRating from './StarRating';
// import './style.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import { CardPage } from './style';
import { Link } from 'react-router-dom';

interface IProductCardProps {
  id?: string;
  shadow?: boolean;
  imgUrl?: string;
  name?: string;
  description?: string;
  clsName?: string;
  createAt?: string;
  discount?: number;
  newArrival?: boolean;
  grey?: boolean;
  bottom?: boolean;
  price?: number;
  starRating?: number;
  oldPrice?: number;
  children?: ReactNode;
}

// const ProductCard = (props: IProductCardProps) => {
//   const [imgUrl, setImgUrl] = useState<string>('');
//   const [showPopup, setIShowpopup] = useState<string>('');
//   let to = `product/${props.id}?name=${props.name}`;

//   useEffect(() => {
//     setTimeout(() => {
//       if (props.imgUrl) setImgUrl(props.imgUrl);
//       else setImgUrl(no_image);
//     }, 5000);
//   }, [props.imgUrl]);

//   const showPopupHandler = () => {
//     // setIShowpopup("popup")
//   };

//   // const hidePopupHandler = () => {
//   //   setIShowpopup("")
//   // };

//   return (
//     <Link to={to} className={`cardpage ${props.clsName} ${props.shadow && 'box-shadow'}`}>
//       <div id="topUpHandler" className="cardpage-body">
//         <div className="cardpage-body_badge">
//           {props.discount && <Badge />}
//           {props.newArrival && <Badge />}
//         </div>
//         <img
//           src={imgUrl}
//           alt={props.name}
//           width="270"
//           height="360"
//           // onMouseOver={showPopupHandler}
//           // onMouseOut={hidePopupHandler}
//         />
//         {/* {showPopup && <Popup clsName={showPopup} showPopupHandler={showPopupHandler} />} */}
//         <Popup clsName={showPopup} showPopupHandler={showPopupHandler} />
//       </div>
//       <div className={`cardpage-footer ${props.bottom && 'mb-4'} ${props.grey && 'bgc-grey'}`}>
//         <StarRating starRating={props.starRating} />
//         <p>{props.name}</p>
//         <div className="footer-price">
//           <span className="price-new">${props.price}.00</span>
//           {props.oldPrice ? <span className="price-old">$90.00</span> : null}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

export default function ProductCard(props: IProductCardProps) {
  const [showPopup, setIShowpopup] = useState<string>('');

  return (
    <Link to={`product/${props.id}?name=${props.name}`} style={{textDecoration: 'none'}}>
    <Card sx={CardPage}>
      <CardMedia component="img" width="270" height="360" image={props.imgUrl} alt={props.name} />
      {/* {showPopup && <Popup clsName={showPopup} />} */}
      <Popup clsName={showPopup} />
      <CardContent>
        <StarRating starRating={props.starRating} />
        <LinkMui href={`product/${props.id}?name=${props.name}`} sx={{textDecoration: 'none'}}>
          <Typography variant="subtitle1" gutterBottom component="div">
            {props.name}
          </Typography>
        </LinkMui>
        <Typography variant="subtitle1" display="block" gutterBottom>
          <b>${props.price}</b>
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}
