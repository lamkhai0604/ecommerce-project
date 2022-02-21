import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import {
  getReccomendProductsList,
  getReccomendProductsListLoading,
  productActions,
} from 'controllers/feature/product/productSlice';
import { useEffect } from 'react';
import ProductCard from 'view/components/ProductCard';
import './style.css';

const Recommend = () => {
  const dispatch = useAppDispatch();
  const ReccommendProductsList = useAppSelector(getReccomendProductsList);
  const isLoadingProductList = useAppSelector(getReccomendProductsListLoading);
  // console.log('Product', ProductsList);

  useEffect(() => {
    dispatch(productActions.fetchRecommendedProductsList(50));
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
        {ReccommendProductsList.map((item) => {
          return (
            <div key={item.id} className="recommend-product mx-5">
              <ProductCard
                grey
                name={item.name}
                imgUrl={item.imgUrl}
                price={item.price}
                starRating={item.starRating}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommend;
