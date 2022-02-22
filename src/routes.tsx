import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import Footer from 'view/components/Footer';
import Header from 'view/components/Header';
import Carousel from 'view/page/LandingPage/Carousel';
import PromotionModal from './view/components/PromotionModal/index';

const RoutesApp = () => {
  let params = useParams();
  let [searchParams] = useSearchParams();
  let productName = searchParams.get('name');
  const [promotionModal, setPromotionModal] = useState<boolean>(false);

  useEffect(() => {
    setPromotionModal(true);
  }, [productName]);

  return (
    <>
      {promotionModal && <PromotionModal onClose={() => setPromotionModal(false)} />}

      <Header />
      {params.id ? <Carousel backgroundImg name={productName} /> : <Carousel />}

      <Outlet />

      <Footer />

    </>
  );
};

export default RoutesApp;
