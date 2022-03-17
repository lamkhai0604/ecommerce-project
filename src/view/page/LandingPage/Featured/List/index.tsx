//Redux
import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import {
  getProductsList,
  getProductsListLoading,
  productActions,
} from 'controllers/feature/product/productSlice';
import { useEffect } from 'react';
import Empty from 'view/components/base/Empty';
import Loading from 'view/components/base/Loading';
import ProductCard from 'view/components/base/ProductCard';
import './style.css';

const List = () => {
  const dispatch = useAppDispatch();
  const ProductsList = useAppSelector(getProductsList);
  const isLoadingProductList = useAppSelector(getProductsListLoading);

  useEffect(() => {
    dispatch(productActions.fetchProductsList(12));
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="featured-product">
        <div className="featured-product_content">
          <h3>Featured Products</h3>
          <p>Add featured products to weekly line up</p>
        </div>
        <div className="featured-product_cardGroup">
          <div className="cardGroup">
            {(() => {
              if (!ProductsList.length) return <Empty clsName="h-300">No data available.</Empty>;
              if (isLoadingProductList && ProductsList) return <Loading />;
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
    </div>
  );
};

export default List;
