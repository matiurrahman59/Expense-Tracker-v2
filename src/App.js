import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContetx';

import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className='app'>
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='login' element={<LogIn />} />
            <Route path='signUp' element={<SignUp />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
