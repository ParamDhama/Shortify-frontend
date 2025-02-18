import { useParams } from "react-router-dom"

function VerifyEmail() {
  const{token} = useParams();
  return (
    <div>
      VerifyEmail
      {token}
    </div>
  )
}

export default VerifyEmail
