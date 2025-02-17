import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
        <Route path='/admin' element={<Admin/>} />

        {/* Route Only for verified user */}
        <Route path='/user/:username' element={<Dashboard/>}/>
        <Route path='/user/:username/settings' element={<Settings/>}/>
        <Route path='/user/:username/change-password' element={<ChangePassword/>}/>
        <Route path='/user/:username/profile' element={<Profile/>}/>

        {/* Default Route for 404 */}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
