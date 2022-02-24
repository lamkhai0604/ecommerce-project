import { FaGreaterThan } from 'react-icons/fa';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import Button from 'view/components/base/Button';
import './style.css';

interface ICarouselProps {
  backgroundImg?: boolean;
  name?: string | null;
}

const Carousel = (props: ICarouselProps) => {
  return (
    <>
      {!props.backgroundImg ? (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img
                src="http://zonan2.demo2.towerthemes.com/image/cache/catalog/slider/slide_2-1-1920x750.jpg"
                className="w-100"
                alt="..."
              />
              <div className="new-carousel-caption d-none d-md-block">
                <h5 className="animation-slideToLeft">First animation slide label</h5>
                <p className="animation-slideToRight">
                  Some representative placeholder content for the first slide.
                </p>
                <Button clsName="animation-btn" inverse>
                  READ MORE
                </Button>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="http://zonan2.demo2.towerthemes.com/image/cache/catalog/slider/slide_2-2-1920x750.jpg"
                className="w-100"
                alt="..."
              />
              <div className="new-carousel-caption d-none d-md-block">
                <h5 className="animation-zoom">First minimize label</h5>
                <p className="animation-bounce">
                  Some representative placeholder content for the first slide.
                </p>
                <Button clsName="animation-btn" inverse>
                  READ MORE
                </Button>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon btn-secondary rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon btn-secondary rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
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
