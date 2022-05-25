import { useAppDispatch, useAppSelector } from 'controllers/app/hooks';
import { categoriesActions, getCategoryById } from 'controllers/feature/categories/categoriesSlice';
import { getProductById, productActions } from 'controllers/feature/product/productSlice';
import { ICartItem } from 'models';
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useParams } from 'react-router-dom';
import Button from 'view/components/base/Button';
// import Input from 'view/components/base/Input';
import StarRating from 'view/components/base/ProductCard/StarRating';
import ProductImg from 'view/components/base/ProductImg';
import Banner from 'view/components/layout/Banner';
import Description from './Description';
import RelatedProduct from './RelatedProduct';
import './style.css';
import Input from 'view/components/base/FormikField';
import { Grid, Paper, styled, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import Divider from 'view/components/base/Divider';

export interface RegisterFormValues {
  phone: string;
}

export const initialRegisterValues: RegisterFormValues = {
  phone: '',
};

export const RegisterSchema = Yup.object().shape({
  phone: Yup.string().min(5, 'Too Short!').max(14, 'Too Long!').required('Required'),
});

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const ProductItem = () => {
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

  const handleSubmitQuantity = (values: RegisterFormValues) => {
    // const handleSubmitQuantity = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // const enteredValue = amountInputRef.current.value;
    // const enteredValueNumber = +enteredValue;
    // if (enteredValue.trim().length === 0 || enteredValueNumber < 1 || enteredValueNumber > 500) {
    //   setIsValid(false);
    //   return;
    // }
    // let item = {
    //   id: ProductItem.id,
    //   name: ProductItem.name,
    //   amount: enteredValueNumber,
    //   price: ProductItem.price,
    //   imgUrl: ProductItem.imgUrl,
    // };
    // dispatch(productActions.addItemIntoCart(item as ICartItem));
  };

  return (
    <>
      <Banner name={ProductItem.name} />
      <Paper sx={{ py: 4, px: 23, maxWidth: 2000 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ProductImg imgUrl={ProductItem.imgUrl} name={ProductItem.name} />
          </Grid>
          <Grid item xs={6} sm container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom variant="h4" component="div">
              {ProductItem.name}
            </Typography>
            <StarRating starRating={ProductItem.starRating} />
            <Typography variant="subtitle1" component="div">
              <b>${ProductItem.price?.toFixed(2)}</b>
            </Typography>

            <Divider clsName="my-3" />

            <Typography variant="body1" gutterBottom>
              Brand: <b>{ProductItem.brand}</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Code: <b>{ProductItem.code}</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: <b>{ProductItem.description}</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: <b>{CategoryItem.name}</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Created at:{' '}
              <b>
                {ProductItem.createdAt && new Date(ProductItem.createdAt).toLocaleString()}
              </b>
            </Typography>

            <Formik
              initialValues={initialRegisterValues}
              onSubmit={handleSubmitQuantity}
              validationSchema={RegisterSchema}
            >
              {() => {
                return (
                  <Form>
                      <Input as={TextField} name="amount" label="Amount" size="small" type="number" defaultValue="1" />

                      <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>
                        Add to cart
                      </Button>

                  </Form>
                );
              }}
            </Formik>

          </Grid>
        </Grid>
      </Paper>
      {/* <div className="productItem">
        <div className="productItem-information">
          <div className="information-productImg">
            <ProductImg imgUrl={ProductItem.imgUrl} name={ProductItem.name} />
          </div>
          <div className="information-groupInfo">
            <h3>{ProductItem.name}</h3>
            <StarRating starRating={ProductItem.starRating} />
            <span>${ProductItem.price?.toFixed(2)}</span>
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
            {/* <form className="groupInfo-quantity" onSubmit={handleSubmitQuantity}> */}
      {/* <Input
                label="Amount"
                ref={amountInputRef}
                min={1}
                max={50}
                input={{
                  type: 'number',
                  step: '1',
                  defaultValue: '1',
                }}
              />
            <Formik
              initialValues={initialRegisterValues}
              onSubmit={handleSubmitQuantity}
              validationSchema={RegisterSchema}
            >
              {() => {
                return (
                  <Form>
                    <Input name="amount" />

                    <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>
                      Add to cart
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>

        <div className="productItem-description mb-5">
          <h4>Description</h4>
          <Description />
        </div>

        <RelatedProduct categoryItem={CategoryItem} />
      </div> */}
    </>
  );
};

export default ProductItem;
