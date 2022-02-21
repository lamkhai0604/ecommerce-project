import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import {
  getRecommendProductsList,
  // getRecommendProductsListLoading,
  productActions,
} from 'controllers/feature/product/productSlice';
import { useEffect } from 'react';
import ProductCard from 'view/components/ProductCard';
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
          <div className="recommend-content_border">
            <p>Recommended For You</p>
          </div>
          <span>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </span>
        </div>
        <div className="recommend-product">
          {RecommendProductsList.map((item) => {
            return (
              <ProductCard
                grey
                clsName="mx-5"
                name={item.name}
                imgUrl={item.imgUrl}
                price={item.price}
                starRating={item.starRating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
