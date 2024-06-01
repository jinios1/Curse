import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const Header: React.FC = () => {
  const { isLoggedIn, username, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  console.log('Auth State:', { isLoggedIn, username, role }); // Более подробный вывод состояния

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <span>Hello, {username}!</span>
            <button onClick={handleLogout}>Logout</button>
            {role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
