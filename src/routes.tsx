import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'view/components/layout/Footer';
import Header from 'view/components/layout/Header';
import PromotionModal from 'view/components/layout/PromotionModal';

const RoutesApp = () => {
  const [promotionModal, setPromotionModal] = useState<boolean>(false);

  useEffect(() => {
    setPromotionModal(true);
  }, []);

  return (
    <>
      {promotionModal && <PromotionModal onClose={() => setPromotionModal(false)} />}

      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default RoutesApp;
