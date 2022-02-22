import { useEffect } from 'react';
//Redux
import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import {
  getProductsList,
  getProductsListLoading,
  productActions,
} from 'controllers/feature/product/productSlice';
import ProductCard from 'view/components/ProductCard';
import './style.css';
import Loading from 'view/components/Loading';
import Empty from 'view/components/Empty';

const List = () => {
  const dispatch = useAppDispatch();
  const ProductsList = useAppSelector(getProductsList);
  const isLoadingProductList = useAppSelector(getProductsListLoading);

  useEffect(() => {
    dispatch(productActions.fetchProductsList(12));
  }, [dispatch]);

  return (
    <div className="featured-product">
      <div className="featured-product_content">
        <h3>Featured Products</h3>
        <p>Add featured products to weekly line up</p>
      </div>
      <div className="featured-product_cardGroup">
        <div className="cardGroup">
          {(() => {
            if (!ProductsList.length) return <Empty clsName="h-300">No data available.</Empty>;
            if (isLoadingProductList && !ProductsList) return <Loading />;
            return ProductsList.map((item) => {
              return (
                <ProductCard
                  bottom
                  key={item.id}
                  id={item.id}
                  imgUrl={item.imgUrl}
                  name={item.name}
                  price={item.price}
                  starRating={item.starRating}
                />
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default List;
