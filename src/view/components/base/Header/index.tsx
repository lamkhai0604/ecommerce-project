import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import CustomLink from '../CustomLink';
import Dropdown from './Dropdown';
import './style.css';

const Header = () => {
  const [headerStyle, setHeaderStyle] = useState<string>('');

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
  }, []);

  const onScroll = () => {
    setHeaderStyle(() => (window.scrollY > 400 ? 'navbar-scroll' : ''));
  };

  return (
    <div id="nav" className={`header ${headerStyle}`}>
      <div className="header-menu">
        <CustomLink className="header-menu_link" to="/">
          Home
        </CustomLink>
        <CustomLink className="header-menu_link" to="specials">
          Specials
        </CustomLink>
        <CustomLink className="header-menu_link" to="information">
          About us
        </CustomLink>
      </div>
      <div className="header-logo">
        <span className="header-logo_main">Khai's</span>Shop
      </div>
      <div className="header-setting">

        <Dropdown />
        
        <span className="header-setting_icons">
          <AiOutlineSearch />
        </span>
        <span className="header-setting_icons">
          <AiOutlineShoppingCart />
        </span>
      </div>
    </div>
  );
};

export default Header;
