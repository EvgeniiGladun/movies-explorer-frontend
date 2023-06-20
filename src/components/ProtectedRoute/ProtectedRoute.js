import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
    if (!props.loggedIn) {
        return <Navigate to="/" replace />
    } return <Outlet />
}

export default ProtectedRouteElement;