import { useState } from "react";
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import useInput from "../../hooks/useInput"
import { useNavigate } from "react-router-dom";

function Login() {
  const {input, handleChange, setInput} = useInput();
  const [message, setMessage] = useState();
  const navigator = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const res = await apiClient.post(endpoints.auth.LOGIN,{email: input.email, password: input.password});
      if(!res.data.token) {
        setMessage('Invalid email or password');
        setInput({});
      }
      localStorage.setItem('token', res.data.token);
      navigator('/user/dashboard');
    }catch(err){
      console.log(err);
      setMessage('Invalid email or password');
      setInput({});
    }
  }
  return (
    <div>
      Login
      {message}
      <form onSubmit={handleLogin} >
        email: <input type="email" name="email" value={input.email} onChange={handleChange} /> <br />
        password: <input type="password" name="password" value={input.password} onChange={handleChange} /> <br />
        <input type="submit" value="Login" />
      </form>
      {input.password}
    </div>
  )
}

export default Login
