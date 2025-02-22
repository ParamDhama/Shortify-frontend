import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if(token){
          var isAuth = true;
          const decodeToken = jwtDecode(token);
          var isAdmin = decodeToken.role ==='admin';
      }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-8">
      <div className="flex justify-between items-center">
        {/* Logo / Home */}
        <Link to="/" className="text-2xl font-bold">
          URL Shortener
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {/* Public Routes */}
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>

          {/* Auth Routes */}
          {!isAuth && (
            <>
              <li><Link to="/auth/login" className="hover:text-gray-400">Login</Link></li>
              <li><Link to="/auth/sign-up" className="hover:text-gray-400">Sign Up</Link></li>
            </>
          )}

          {/* User Dashboard */}
          {isAuth && (
            <>
              <li><Link to="/user/dashboard" className="hover:text-gray-400">Dashboard</Link></li>
              <li><Link to="/user/profile" className="hover:text-gray-400">Profile</Link></li>
              <li><Link to="/user/settings" className="hover:text-gray-400">Settings</Link></li>
            </>
          )}

          {/* Admin Routes */}
          {isAdmin && <li><Link to="/admin" className="hover:text-gray-400">Admin Panel</Link></li>}

          {/* Logout */}
          {isAuth && (
            <li>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
