import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import CustomLink from 'view/components/base/CustomLink';
import Cart from './Cart';
import Dropdown from './Dropdown';
import './style.css';

const Header = () => {
  const [headerStyle, setHeaderStyle] = useState<string>('');

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setHeaderStyle(() => (window.scrollY > 400 ? 'scroll-nav' : ''));
    });
  }, []);

  return (
    <div id="nav" className={`navbar ${headerStyle}`}>
      <div className="container-fluid">
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

          <span className="header-setting_search mx-4">
            <AiOutlineSearch />
          </span>

          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Header;
