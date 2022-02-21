import { AiFillSetting, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-menu">
        <Link className="header-menu_link" to='home'>Home</Link>
        <Link className="header-menu_link" to='specials'>Specials</Link>
        <Link className="header-menu_link" to='information'>About us</Link>
      </div>
      <div className="header-logo">
          <span className="header-logo_main">Khai's</span>Shop
      </div>
      <div className="header-setting">
        <span className="header-setting_icons"><AiFillSetting /></span>
        <span className="header-setting_icons"><AiOutlineSearch /></span>
        <span className="header-setting_icons">
          <AiOutlineShoppingCart />
        </span>
      </div>
    </div>
  );
};

export default Header;
