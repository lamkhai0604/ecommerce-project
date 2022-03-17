import { FaGreaterThan } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

interface IBannerProps {
  clsName?: string;
  name?: string;
  subName?: string;
  title?: string;
}

const Banner = (props: IBannerProps) => {
  let navigate = useNavigate();
  return (
    <div className="carousel-bg">
      <h2>{props.title && props.title}</h2>
      <div className={`carousel-bg_group ${props.clsName}`}>
        <Link to="/" className="carousel-bg_icons">
          <ImHome />
        </Link>

        <FaGreaterThan className="mt-2 mx-3" />

        <span className="mt-2 banner-name" onClick={() => navigate(-1)}>
          {props.name}
        </span>

        {props.subName ? (
          <>
            <FaGreaterThan className="mt-2 mx-3" />

            <span className="mt-2 sub-name">{props.subName}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Banner;
