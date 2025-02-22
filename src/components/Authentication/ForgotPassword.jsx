import { useState } from "react";
import useInput from "../../hooks/useInput"
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

function ForgotPassword() {
  const {input,handleChange,setInput} = useInput();
  const [message,setMessage] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setMessage('Loading...')
      const res = await apiClient.post(endpoints.auth.FORGOT_PASS,{email: input.email})
      if(res.data.message == 'Password reset email sent. Check your inbox.'){
        setMessage('Password reset email sent. Check your inbox.')
        setInput({});
      }
      else{
        setMessage('User not found')
        setInput({});
      }
    } catch (err) {
      console.log(err);
      setInput({});
      setMessage('User not found');
    }
  }
  return (
    <div>
      ForgotPassword
      {message}
      <form onSubmit={handleSubmit}>
        email: <input type="email" name="email" value={input.email} onChange={handleChange} /> <br />
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

export default ForgotPassword
