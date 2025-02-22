/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Redirect from './pages/Redirect';
import Admin from './pages/Admin';
import Authentication from './pages/Authentication';
import Navbar from './components/Miscellaneous/Navbar';
import Settings from './components/Miscellaneous/Settings';
import ChangePassword from './components/Miscellaneous/ChangePassword';
import Profile from './components/Miscellaneous/Profile';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import VerifyEmail from './components/Authentication/VerifyEmail';
import ResetPassword from './components/Authentication/ResetPassword';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ProtectedRoute from './components/Miscellaneous/ProtectedRoute'; // Importing correctly

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/redirect/:slug' element={<Redirect />} />

        {/* Authentication Routes */}
        <Route path='/auth/login' element={<Authentication><Login /></Authentication>} />
        <Route path='/auth/forgot-password' element={<Authentication><ForgotPassword /></Authentication>} />
        <Route path='/auth/sign-up' element={<Authentication><Register /></Authentication>} />
        <Route path='/auth/reset-password/:token' element={<Authentication><ResetPassword /></Authentication>} />
        <Route path='/auth/verify/:token' element={<Authentication><VerifyEmail /></Authentication>} />

        {/* Admin Routes */}
        <Route path='/admin' element={<ProtectedRoute isAdminRequired={true} element={<Admin />} />} />

        {/* User Routes */}
        <Route path='/user/dashboard' element={<ProtectedRoute isAdminRequired={false} element={<Dashboard />} />} />
        <Route path='/user/settings' element={<ProtectedRoute isAdminRequired={false} element={<Settings />} />} />
        <Route path='/user/change-password' element={<ProtectedRoute isAdminRequired={false} element={<ChangePassword />} />} />
        <Route path='/user/profile' element={<ProtectedRoute isAdminRequired={false} element={<Profile />} />} />

        {/* 404 Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
