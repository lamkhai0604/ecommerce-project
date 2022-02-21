import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'controllers/app/store';
import { Provider } from 'react-redux';
// import { history } from 'utils';
import HomePage from 'view/page/HomePage';
import NotFound from 'view/page/NotFound';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<HomePage />} />
          <Route path="specials" element={<NotFound />} />
          <Route path="information" element={<NotFound />} />
        </Route>

        {/* No other routes match */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
