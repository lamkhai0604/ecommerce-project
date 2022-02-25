import { ICartItem } from 'models';
import './style.css';

interface IProductProps {
  id?: string;
  imgUrl?: string;
  name?: string;
  amount?: number;
  price?: number;
  onAdd?: (item: ICartItem) => void;
  onRemove?: (id?: string) => void;
}

const Product = (props: IProductProps) => {
  const item = {
    id: props.id,
    name: props.name,
    price: props.price,
    imgUrl: props.imgUrl,
    amount: props.amount,
  } as ICartItem;
  return (
    <div className="product">
      <img src={props.imgUrl} alt="Product" width="90px" height="120px" />
      <div className="product-content">
        <p>{props.name}</p>
        <div className="product-content_sum">
          <div>
            <span>{props.amount}</span>
            <span className="mx-2">x</span>
            <span style={{ fontWeight: 'bold', color: '#ff0055' }}>${props.price}</span>
          </div>
          <div className="content-sum_icons">
            <button
              type="button"
              className="btn btn-dark"
              style={{ fontWeight: 'bold' }}
              onClick={props.onAdd && props.onAdd.bind(null, item)}
            >
              +
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginLeft: '7px', fontWeight: 'bold' }}
              onClick={props.onRemove && props.onRemove.bind(null, props.id)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
