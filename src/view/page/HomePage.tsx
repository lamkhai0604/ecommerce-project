import { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import Footer from 'view/components/Footer';
import Header from 'view/components/Header';
import PromotionModal from 'view/components/PromotionModal';
import Carousel from './LandingPage/Carousel';
import Featured from './LandingPage/Featured';
import Recommend from './LandingPage/Recommend';
import Services from './LandingPage/Services';
// import NotFound from './NotFound';

const HomePage = () => {
  const [promotionModal, setPromotionModal] = useState<boolean>(false);

  useEffect(() => {
    setPromotionModal(true);
  }, []);

  return (
    <div>
      {promotionModal && <PromotionModal onClose={() => setPromotionModal(false)} />}

      <Header />
      {/* <Outlet /> */}

      <Carousel />
      <Services />
      <Recommend />
      <Featured />
      {/* <NotFound /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
