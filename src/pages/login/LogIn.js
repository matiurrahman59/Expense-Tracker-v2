import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContetx';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './LogIn.module.css';

const LogIn = () => {
  // hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // custom hooks
  const { login, error, isPending } = useLogin();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if user find
  useEffect(() => {
    if (user && pathname === '/login') {
      navigate('/');
    }
  }, [user, navigate, pathname]);

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='true'
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='true'
          value={password}
        />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && (
        <button className='btn' disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default LogIn;
