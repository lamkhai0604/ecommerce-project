import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'controllers/app/store';
import { Provider } from 'react-redux';
import BackdropLoading from 'view/components/base/BackdropLoading';
import './index.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from 'assets/theme';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<BackdropLoading />}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
