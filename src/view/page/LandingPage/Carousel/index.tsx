import { FaGreaterThan } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Slides from './Slides';
import './style.css';

interface ICarouselProps {
  id?: string;
  name?: string | null;
}

const Carousel = (props: ICarouselProps) => {
  // console.log("carousel", props)
  return (
    <>
      {!props.id ? <Slides /> : (
        <div className="carousel-bg">
          <div className="carousel-bg_group">
            <Link to="/" className="carousel-bg_icons">
              <ImHome />
            </Link>

            <FaGreaterThan className="mt-2 mx-3" />

            <span className="mt-2">{props.name}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
