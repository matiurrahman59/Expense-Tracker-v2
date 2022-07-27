import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContetx';
import { useSignup } from '../../hooks/useSignup';

// styles
import styles from './SignUp.module.css';

export default function Signup() {
  // hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // custom hooks
  const { signup, isPending, error } = useSignup();
  const { user } = useAuthContext();

  // formSUbmit
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  // redirect if user find
  useEffect(() => {
    if (user && pathname === '/signup') {
      navigate('/');
    }
  }, [user, pathname, navigate]);

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>sign up</h2>
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
          autoComplete='false'
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          autoComplete='true'
          value={displayName}
        />
      </label>
      {!isPending && <button className='btn'>sign up</button>}
      {isPending && (
        <button className='btn' disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
