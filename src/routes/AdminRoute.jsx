import React from 'react'; 
import UseAuth from '../hooks/UseAuth';
import userRole from '../Layouts/userRole';
import Loading from '../components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';


const AdminRoute = ({ children }) => {
    const { loading } = UseAuth();
    const { role, roleLoading } = userRole();

    if (loading || roleLoading) {
        return <Loading />
    }
    
    if (role !== 'admin') {
        return <Forbidden />
    }

   
    return children;
};

export default AdminRoute;