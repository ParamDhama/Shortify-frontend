import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import apiClient from "../../api/apiClient";
import endpoints from "../../api/endpoints";

function VerifyEmail() {
  const{token} = useParams();
  const navigator = useNavigate();
  const [message,setMessage] = useState('');
  
  const handleVerify = async(e)=>{
    e.preventDefault();
    try{
      setMessage("Loading");
    const res = await apiClient.get(endpoints.auth.VERIFY_EMAIL(token));
    if(res.data.message == 'Email verified successfully! You can now log in.'){
      setMessage("you are now verified");
      setTimeout(()=>{
        navigator('/auth/login');
      },3000);
    }
    else{
      setMessage("Verification failed. Redirecting...")
      console.log(res.data);
      setTimeout(() => {
        navigator('/')
      }, 3000);
    }
    }
    catch(err){
      console.log(err);
      setMessage("Verification failed. Redirecting...");
      setTimeout(() => {
        navigator('/')
      }, 3000);
    }

  }

  return (
    <div>
      VerifyEmail
      {message}
      <br />
      <button onClick={handleVerify}>verify</button>
    </div>
  )
}

export default VerifyEmail
