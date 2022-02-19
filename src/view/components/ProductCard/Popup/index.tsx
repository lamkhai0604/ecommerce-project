import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import './style.css';

interface IPopupProps {
    clsName: string;
}

const Popup = (props: IPopupProps) => {
  return (
    <div className={props.clsName}>
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
