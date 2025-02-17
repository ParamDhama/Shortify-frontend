import {Routes,Route} from 'react-router-dom'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import VerifyEmail from '../components/Authentication/VerifyEmail'
import ForgetPassword from '../components/Authentication/ForgotPassword'
import ResetPassword from '../components/Authentication/ResetPassword'


function Authentication() {
  return (
    <div>
      Authentication
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='sign-up' element={<Register/>}/>
        <Route path='verify/:slug' element={<VerifyEmail/>}/>
        <Route path='forget-password' element={<ForgetPassword/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default Authentication
