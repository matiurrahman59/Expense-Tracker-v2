import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContetx';
import { useLogout } from '../../hooks/useLogout';

import styles from './Navbar.module.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>

        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button className='btn' onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
