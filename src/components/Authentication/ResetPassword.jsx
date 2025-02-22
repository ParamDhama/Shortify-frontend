import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/useInput"
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";
import { useState } from "react";

function ResetPassword() {
  const {input, handleChange,setInput} = useInput();
  const navigator = useNavigate();
  const {token} = useParams();
  const [message,setMessaage] = useState();


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(input.password != input.confirm) {
      setMessaage("Messages are not same");
      return;
    }
    try {
      const res = await apiClient.post(endpoints.auth.RESET_PASS(token),{password: input.password});
      setInput({});
      if(res.data.message == 'Password reset successfully! You can now log in.'){
        setMessaage(res.data.message);
        setTimeout(() => {
          navigator('/auth/login');
        }, 3000);
      }
      else{
        setMessaage("Password reset not successful!");
        setTimeout(() => {
          navigator('/')
        }, 3000);
      }
    } catch (err) {
      console.log(err)
      setInput({});
      setMessaage("Password reset not successful!");
        setTimeout(() => {
          navigator('/')
        }, 3000);
    }
  }
  return (
    <div>
      ResetPassword
      
      <form onSubmit={handleSubmit}>
        new password : <input type="password" name="password" value={input.password} onChange={handleChange}/> <br />
        confirm password : <input type="password" name="confirm" value={input.confirm} onChange={handleChange}/> <br />
      </form>

      {message}
    </div>
  )
}

export default ResetPassword