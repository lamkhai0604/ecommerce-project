import { AiFillSetting, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-menu">
        <Link className="header-menu_link" to='/'>Home</Link>
        <Link className="header-menu_link" to='special'>Specials</Link>
        <Link className="header-menu_link" to='information'>About us</Link>
      </div>
      <div className="header-logo">
          <span className="header-logo_main">Khai's</span>Shop
      </div>
      <div className="header-setting">
        <span><AiFillSetting /></span>
        <span><AiOutlineSearch /></span>
        <span>
          <AiOutlineShoppingCart />
        </span>
      </div>
    </div>
  );
};

export default Header;
