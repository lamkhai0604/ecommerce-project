import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import './style.css';

interface IPopupProps {
  clsName?: string;
  id?: string;
  showPopupHandler: () => void;
}

const Popup = (props: IPopupProps) => {

const doAddToCart = () => {
  console.log('test')
}

  return (
    <div id={props.id} className={props.clsName || 'popup'} onMouseOver={props.showPopupHandler}>
      <p onClick={doAddToCart}>Add to cart</p>
      <div className={`${props.clsName}-icons`}>
        <span>
          <AiOutlineSearch />
        </span>
        <span>
          <AiOutlineHeart />
        </span>
      </div>
    </div>
  );
};

export default Popup;
