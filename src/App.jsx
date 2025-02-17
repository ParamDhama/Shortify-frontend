/* eslint-disable react/prop-types */
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Redirect from './pages/Redirect'
import Admin from './pages/Admin'
import Authentication from './pages/Authentication'
import Navbar from './components/Miscellaneous/Navbar'
import Settings from './components/Miscellaneous/Settings'
import ChangePassword from './components/Miscellaneous/ChangePassword'
import Profile from './components/Miscellaneous/Profile'

const isAuthenticated = () => {
  return false;
}

const isAdmin = () => {
  return true;
}


function ProtectedRoute({element, isAdminRequired}) {
  if(!isAuthenticated()) return <Navigate to="/auth/login"/>;
  if(isAdminRequired && !isAdmin()) return <Navigate to="/"/>
  return element
}


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Route for all */}
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<NotFound/>}/>
        <Route path='/auth/verify' element={<NotFound/>}/>
        <Route path='/auth/*' element={<Authentication/>}/>
        <Route path='/:slug' element={<Redirect/>}/>

        {/* Route Only for Admin */}
        <Route path='/admin' element={<ProtectedRoute element={<Admin/>} isAdminRequired={true}/>} />
    
        {/* Route Only for verified user */}
        <Route path='/user/:username/dashboard' element={<ProtectedRoute element={<Dashboard/>} isAdminRequired={false}/>}/>
        <Route path='/user/:username/settings' element={<ProtectedRoute element={<Settings/>} isAdminRequired={false}/>}/>
        <Route path='/user/:username/change-password' element={<ProtectedRoute element={<ChangePassword/>} isAdminRequired={false}/>}/>
        <Route path='/user/:username/profile' element={<ProtectedRoute element={<Profile/>} isAdminRequired={false}/>}/>

        {/* Default Route for 404 */}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
