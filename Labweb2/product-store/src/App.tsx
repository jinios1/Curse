import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
