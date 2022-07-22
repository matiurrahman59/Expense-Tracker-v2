import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import Navbar from './components/navbar/Navbar';

// import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<LogIn />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
