import { useEffect, useState } from 'react';
import { AiFillSetting, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import CustomLink from '../CustomLink';
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
        <span className="header-setting_icons dropdown">
          <AiFillSetting
            className="dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </span>
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
