import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import RoutesApp from 'routes';
import HomePage from 'view/page/HomePage';
import Cart from 'view/page/LandingPage/Cart';
import Checkout from 'view/page/LandingPage/Checkout';
import ProductItem from 'view/page/LandingPage/Featured/ProductItem';
import NotFound from 'view/page/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RoutesApp />}>
        <Route index element={<HomePage />} />
        <Route path="index/route=cart" element={<Cart />} />
        <Route path="index/route=cart/*" element={<Checkout />} />
        <Route path="product/:id" element={<ProductItem />} />
        <Route path="specials" element={<NotFound />} />
        <Route path="information" element={<NotFound />} />
      </Route>

      {/* No other routes match */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
