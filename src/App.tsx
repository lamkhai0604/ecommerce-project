import HomePage from 'view/page/HomePage';
import NotFound from 'view/page/NotFound';
import { Route, Routes } from 'react-router-dom';
import RoutesApp from 'routes';
import ProductItem from 'view/page/LandingPage/Featured/ProductItem';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RoutesApp />}>
        <Route index element={<HomePage />} />
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
