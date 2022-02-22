import './style.css';

interface IProductImgProps {
  imgUrl?: string;
  name?: string;
}

const ProductImg = (props: IProductImgProps) => {
  return (
    <img src={props.imgUrl} className="productImg" width="556px" height="740px" alt={props.name} />
  );
};

export default ProductImg;
