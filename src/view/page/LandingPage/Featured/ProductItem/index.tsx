import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { categoriesActions, getCategoryById } from 'controllers/feature/categories/categoriesSlice';
import { getProductById, productActions } from 'controllers/feature/product/productSlice';
import { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Button from 'view/components/Button';
import Input from 'view/components/Input';
import StarRating from 'view/components/ProductCard/StarRating';
import ProductImg from 'view/components/ProductImg';
import Subscribers from 'view/components/Subscribers';
import Description from './Description';
import RelatedProduct from './RelatedProduct';
import './style.css';

interface IProductItemProps {}

const ProductItem = (props: IProductItemProps) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const ProductItem = useAppSelector(getProductById);
  const CategoryItem = useAppSelector(getCategoryById);

  useEffect(() => {
    if (params.id) dispatch(productActions.fetchProductById(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (ProductItem.categoryId)
      dispatch(categoriesActions.fetchCategoryById(ProductItem.categoryId));
  }, [dispatch, ProductItem.categoryId]);

  return (
    <div className="productItem">
      <div className="productItem-information">
        <ProductImg imgUrl={ProductItem.imgUrl} name={ProductItem.name} />
        <div className="information-groupInfo">
          <h3>{ProductItem.name}</h3>
          <StarRating starRating={ProductItem.starRating} />
          <span>${ProductItem.price}.00</span>
          <ul>
            <li>
              Brand: <span>{ProductItem.brand}</span>
            </li>
            <li>
              Code: <span>{ProductItem.code}</span>
            </li>
            <li>
              Description: <span>{ProductItem.description}</span>
            </li>
            <li>
              Category: <span>{CategoryItem.name}</span>
            </li>
            <li>
              Created at:{' '}
              <span>
                {ProductItem.createdAt && new Date(ProductItem.createdAt).toLocaleString()}
              </span>
            </li>
          </ul>
          <div className="groupInfo-quantity">
            <Input
              label="Quantity"
              input={{
                type: 'number',
              }}
            />
            <Button inverse>
              {' '}
              <AiOutlineShoppingCart />
              &nbsp;Add to cart
            </Button>
          </div>
        </div>
      </div>

      <div className="productItem-description mb-5">
        <h4>Description</h4>
        <Description />
      </div>

      <RelatedProduct categoryItem={CategoryItem} />

      <Subscribers />
    </div>
  );
};

export default ProductItem;
