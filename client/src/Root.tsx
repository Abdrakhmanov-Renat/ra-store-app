import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { PhonesPage } from './pages/PhonesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritePage } from './pages/FavoritePage';
import store from './app/store';
import { Provider } from 'react-redux';
import { CartPage } from './pages/CartPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountActivationPage } from './pages/AccountActivationPage';
import { PrivateRoute } from './components/PrivateRoute';
import { UserPage } from './pages/UserPage';
import { SettingsUserPage } from './pages/SettingsUserPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="login" element={<RegistrationPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="activate/:activationToken" element={<AccountActivationPage />} />
          <Route path="userpage" element={<UserPage />} />

          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId?" element={<ProductPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId?" element={<ProductPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId?" element={<ProductPage />} />
          </Route>

          <Route
            path="favorite"
            element={
              <PrivateRoute>
                <FavoritePage />
              </PrivateRoute>
            }
          />

          <Route
            path="cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />

          <Route
            path="settings"
            element={
              <PrivateRoute>
                <SettingsUserPage />
              </PrivateRoute>
            }
          />

          <Route
            path="settings/password"
            element={
              <PrivateRoute>
                <ChangePasswordPage />
              </PrivateRoute>
            }
          />

          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
