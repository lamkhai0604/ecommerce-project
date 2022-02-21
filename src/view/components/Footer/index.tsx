import { MdFaceRetouchingNatural } from 'react-icons/md';
import { RiVisaFill } from 'react-icons/ri';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import { FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import './style.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-info">
        <div className="footer-info_brand">
          <div className="footer-logo">
            <span className="footer-logo_main">Khai's</span>Shop
          </div>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </h5>
          <p>Follow me on social: </p>
          <div className="footer-info_brand--icons">
            <span>
              <AiFillGithub />
            </span>
            <span>
              <AiFillLinkedin />
            </span>
            <span>
              <AiFillMail />
            </span>
          </div>
        </div>

        <div className="footer-info_sub">
          <h5>Opening Time</h5>
          <ul className="footer-info_sub--links">
            <li>Mon - Fri: 8AM - 10PM</li>
            <li>Sat: 9AM-8PM</li>
            <li>Sun: Closed</li>
          </ul>
          <span>We Work All The Holidays</span>
        </div>

        <div className="footer-info_sub">
          <h5>Information</h5>
          <ul className="footer-info_sub--links">
            <li>About us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms &#38; Conditions</li>
            <li>Contact me</li>
          </ul>
        </div>

        <div className="footer-info_sub">
          <h5>Customer Service</h5>
          <ul className="footer-info_sub--links">
            <li>About us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms &#38; Conditions</li>
            <li>Contact me</li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-copyright_container">
          <span>
            &copy; Created by&nbsp;
            <a
              style={{ textDecoration: 'none' }}
              href="https://www.linkedin.com/in/kh%E1%BA%A3i-l%C3%A2m-04ab8712a/"
            >
              Lâm Khải
            </a>
            &nbsp;
            <MdFaceRetouchingNatural />
          </span>
          <div className="footer-copyright_container--icons">
            <span>
              <RiVisaFill />
            </span>
            <span>
              <FaCcMastercard />
            </span>
            <span>
              <FaCcPaypal />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
