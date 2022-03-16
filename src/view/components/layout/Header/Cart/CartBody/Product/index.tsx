import { ICartItem } from 'models';
import { Link } from 'react-router-dom';
import './style.css';

interface IProductProps {
  id?: string;
  imgUrl?: string;
  name?: string;
  amount?: number;
  price?: number;
  onAdd?: (item: ICartItem) => void;
  onRemove?: (id?: string) => void;
  onDelete?: (id?: string) => void;
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
    <div className="product mb-3">
      <img src={props.imgUrl} alt="Product" width="90px" height="120px" />
      <div className="product-content">
        <Link to={`product/${props.id}`}>{props.name}</Link>
        <div className="product-content_sum">
          <div>
            <span>{props.amount}</span>
            <span className="mx-2">x</span>
            <span style={{ fontWeight: 'bold', color: '#ff0055' }}>${props.price}</span>
          </div>
          <div className="content-sum_icons ms-2">
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
              className="btn btn-warning"
              style={{ margin: ' 0 5px', fontWeight: 'bold' }}
              onClick={props.onRemove && props.onRemove.bind(null, props.id)}
            >
              -
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ fontWeight: 'bold' }}
              onClick={props.onDelete && props.onDelete.bind(null, props.id)}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
