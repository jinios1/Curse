import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const role = useSelector((state: RootState) => state.auth.role);

  return isLoggedIn && role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
