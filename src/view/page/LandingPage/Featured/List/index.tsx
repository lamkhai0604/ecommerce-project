//Redux
import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { getProductsList, productActions } from 'controllers/feature/product/productSlice';
import { useEffect } from 'react';
import Empty from 'view/components/base/Empty';
import ProductCard from 'view/components/base/ProductCard';
import './style.css';

const List = () => {
  //Redux
  const dispatch = useAppDispatch();
  const ProductsList = useAppSelector(getProductsList);

  useEffect(() => {
    (async () => await dispatch(productActions.fetchProductsList(12)))();
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
              if (!ProductsList.length) return <Empty clsName="">No data available.</Empty>;
              return ProductsList.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    imgUrl={item.imgUrl}
                    description={item.description}
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
