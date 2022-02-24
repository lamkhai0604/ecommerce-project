import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard';
import './style.css';

interface ISwiperProps<T> {
  data?: T[];
  slidesPerView?: number;
  spaceBetween?: number;
}

const SwiperCard = (props: ISwiperProps<any>) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={props.spaceBetween}
      slidesPerView={props.slidesPerView}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {props.data &&
        props.data.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <ProductCard
                id={item.id}
                name={item.name}
                imgUrl={item.imgUrl}
                price={item.price}
                starRating={item.starRating}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SwiperCard;
