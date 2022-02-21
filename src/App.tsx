import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'view/components/Header';
import PromotionModal from './view/components/PromotionModal/index';

const App = () => {
  const [promotionModal, setPromotionModal] = useState<boolean>(false);

  useEffect(() => {
    setPromotionModal(true);
  }, []);

  return (
    <div>
      {promotionModal && <PromotionModal onClose={() => setPromotionModal(false)} />}

      <Header />
      <Outlet />

    </div>
  );
};

export default App;
