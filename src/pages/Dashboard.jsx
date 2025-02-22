import ShortenUrl from '../components/Dashboard/ShortenUrl'
// import UrlAnalystics from '../components/Dashboard/UrlAnalytics'
import UrlList from '../components/Dashboard/UrlList'


function Dashboard() {
  return (
    <div>
      Dashboard
      <ShortenUrl/>
      {/* <UrlAnalystics/> */}
      <UrlList/>
    </div>
  )
}

export default Dashboard
