import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import './style.css';

interface IPopupProps {
  clsName?: string;
  id?: string;
  onmouseover?: (e: MouseEvent) => void;
}

const Popup = (props: IPopupProps) => {
  return (
    <div id={props.id} className={props.clsName}>
      <p>Add to cart</p>
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
