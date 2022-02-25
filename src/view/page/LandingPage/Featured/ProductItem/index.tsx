import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { categoriesActions, getCategoryById } from 'controllers/feature/categories/categoriesSlice';
import { getProductById, productActions } from 'controllers/feature/product/productSlice';
import { ICartItem } from 'models';
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Button from 'view/components/base/Button';
import Input from 'view/components/base/Input';
import StarRating from 'view/components/base/ProductCard/StarRating';
import ProductImg from 'view/components/base/ProductImg';
import Subscribers from 'view/components/layout/Subscribers';
import Description from './Description';
import RelatedProduct from './RelatedProduct';
import './style.css';

interface IProductItemProps {}

const ProductItem = (props: IProductItemProps) => {
  //Router
  const params = useParams();
  //Redux
  const dispatch = useAppDispatch();
  const ProductItem = useAppSelector(getProductById);
  const CategoryItem = useAppSelector(getCategoryById);
  //State
  const [isValid, setIsValid] = useState<boolean>(true);
  //Ref
  const amountInputRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (params.id) dispatch(productActions.fetchProductById(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (ProductItem.categoryId)
      dispatch(categoriesActions.fetchCategoryById(ProductItem.categoryId));
  }, [dispatch, ProductItem.categoryId]);

  const handleSubmitQuantity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredValue = amountInputRef.current.value;
    const enteredValueNumber = +enteredValue;

    if (enteredValue.trim().length === 0 || enteredValueNumber < 1 || enteredValueNumber > 500) {
      setIsValid(false);
      return;
    }
    let item = {
      id: ProductItem.id,
      name: ProductItem.name,
      amount: enteredValueNumber,
      price: ProductItem.price,
      imgUrl: ProductItem.imgUrl
    };
    dispatch(productActions.addItemIntoCart(item as ICartItem));
  };

  return (
    <div className="productItem">
      <div className="productItem-information">
        <div className="information-productImg">
          <ProductImg imgUrl={ProductItem.imgUrl} name={ProductItem.name} />
        </div>
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
          <form className="groupInfo-quantity" onSubmit={handleSubmitQuantity}>
            <Input
              label="Amount"
              ref={amountInputRef}
              input={{
                type: 'number',
                min: '1',
                max: '50',
                step: '1',
                defaultValue: '1',
              }}
            />

            <Button inverse>
              {' '}
              <AiOutlineShoppingCart />
              &nbsp;Add to cart
            </Button>

            {!isValid && <small>Please enter a valid amount (1-500).</small>}
          </form>
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
