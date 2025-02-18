import { useParams } from "react-router-dom"

function Redirect() {
  const {slug} = useParams();
  return (
    <div>
      Redirect
      {slug}
    </div>
  )
}

export default Redirect
