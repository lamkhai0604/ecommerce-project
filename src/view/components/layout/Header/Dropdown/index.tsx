import { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import RegisterModal from 'view/components/layout/RegisterModal';
import './style.css';

const Dropdown = () => {
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  return (
    <>
      {registerModal && <RegisterModal onClose={() => setRegisterModal(false)} />}

      <span className="header-setting_setting dropdown">
        <AiFillSetting
          className="dropdown-toggle"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <span className="dropdown-item" onClick={() => setRegisterModal(true)}>
              Register
            </span>
          </li>
          <li>
            <span className="dropdown-item">Login</span>
          </li>
        </ul>
      </span>
    </>
  );
};

export default Dropdown;
