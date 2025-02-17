import AdminDashboard from '../components/Admin/AdminDashboard'
import UrlManagement from '../components/Admin/UrlManagement'
import UserManagement from '../components/Admin/UserManagement'

function Admin() {
  return (
    <div>
      Admin
      <AdminDashboard/>
      <UrlManagement/>
      <UserManagement/>
    </div>
  )
}

export default Admin
