import React, { Children } from 'react';
import UseAuth from '../hooks/UseAuth';
import userRole from '../Layouts/userRole';
import Loading from '../components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = () => {
    const { loading} = UseAuth();
    const {role, roleLoading} = userRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }
    return Children;
};

export default AdminRoute;