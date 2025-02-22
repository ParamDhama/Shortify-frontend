// User register form componenets.

import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient'
import endpoints from '../../api/endpoints'
import useInput from "../../hooks/useInput"

function Register() {


  const {input ,handleChange, setInput} = useInput();
  const navigator = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try{
    const res = await apiClient.post(endpoints.auth.CREATE_USER, input);
    console.log(res);
    if(res.data.message != 'User registered! Check your email to verify your account.'){
      setInput({});
    }
    navigator('/auth/login');
    }
    catch(err){
      console.log(err);
      setInput({});
      
    }
  }

  return (
    <div>
      Register
      <form onSubmit={handleRegister}>
        name: <input type="text" name="name" value={input.name} onChange={handleChange} /> <br />
        email: <input type="email" name="email"value={input.email} onChange={handleChange}/> <br />
        pass: <input type="password" name="password" value={input.password} onChange={handleChange} /> <br />
        <input type="submit" value="Register" />
      </form>
      {[input["password"]]}
    </div>
  )
}

export default Register
