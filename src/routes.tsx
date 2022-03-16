import { useEffect, useState } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import Footer from 'view/components/layout/Footer';
import Header from 'view/components/layout/Header';
import PromotionModal from 'view/components/layout/PromotionModal';
import Carousel from 'view/page/LandingPage/Carousel';

const RoutesApp = () => {
  let params = useParams();
  let [searchParams] = useSearchParams();
  let productName = searchParams.get('name');
  const [promotionModal, setPromotionModal] = useState<boolean>(false);

  useEffect(() => {
    setPromotionModal(true);
  }, []);

  return (
    <>
      {promotionModal && <PromotionModal onClose={() => setPromotionModal(false)} />}

      <Header />
      {params.id ? <Carousel id={params.id} name={productName} /> : <Carousel />}

      <Outlet />

      <Footer />

    </>
  );
};

export default RoutesApp;
