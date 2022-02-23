import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import {
  getRecommendProductsList,
  // getRecommendProductsListLoading,
  productActions,
} from 'controllers/feature/product/productSlice';
import { useEffect } from 'react';
import SwiperCard from 'view/components/SwiperCard';
import './style.css';

const Recommend = () => {
  const dispatch = useAppDispatch();
  const RecommendProductsList = useAppSelector(getRecommendProductsList);
  // const isLoadingProductList = useAppSelector(getReccomendProductsListLoading);
  // console.log('Product', ProductsList);

  useEffect(() => {
    dispatch(productActions.fetchRecommendProductsList(20));
  }, [dispatch]);

  return (
    <div className="recommend">
      <div className="recommend-container py-4">
        <div className="recommend-content">
          <span className="recommend-content_border" />
          <h4>Recommended For You</h4>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="recommend-product">
          <SwiperCard data={RecommendProductsList} slidesPerView={5} spaceBetween={30} />
        </div>
      </div>
    </div>
  );
};

export default Recommend;
