import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from 'view/components/layout/Footer';
import Header from 'view/components/layout/Header';
import PromotionModal from 'view/components/layout/PromotionModal';
import Subscribers from 'view/components/layout/Subscribers';

const RoutesApp = () => {
  //State

  const [promotionModal, setPromotionModal] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const id = useRef(0);

  const clearTimeOut = () => window.clearInterval(id.current);

  useEffect(() => {
    setPromotionModal(true);
    id.current = window.setInterval(() => setTimer((i) => i - 1), 1000);
    return () => clearTimeOut();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearTimeOut();
      setPromotionModal(false)
    }
  }, [timer]);

  return (
    <>
      {promotionModal && <PromotionModal count={timer} onClose={() => setPromotionModal(false)} />}

      <Header />

      <ToastContainer />
      
      <Outlet />

      <Subscribers />

      <Footer />
    </>
  );
};

export default RoutesApp;
