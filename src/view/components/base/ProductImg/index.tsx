import './style.css';

interface IProductImgProps {
  imgUrl?: string;
  name?: string;
}

const ProductImg = (props: IProductImgProps) => {
  return (
    <img src={props.imgUrl} className="productImg" width="450px" height="600px" alt={props.name} />
  );
};

export default ProductImg;
