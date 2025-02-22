/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ element, isAdminRequired }) {
    const token = localStorage.getItem('token');
    if(token){
        var isAuth = true;
        const decodeToken = jwtDecode(token);
        var isAdmin = decodeToken.role ==='admin';
    }
    if (!isAuth) {
        return <Navigate to="/auth/login" />;
    }

    if (isAdminRequired && !isAdmin) {
        return <Navigate to="/" />;
    }

    return element;
}

export default ProtectedRoute;
