import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';



export const PrivatRoute = ({component:Component, ...rest}) => {
    const loggedIn = useSelector(state => state.loggedIn);
    const jwt = Cookies.get('jwt');
   return ( 
    <Route 
    {...rest}
    render={props =>
        loggedIn && jwt !== undefined ? (
            <Component {...props} />
        ):(
            <Redirect to={{
                pathname:"/login",
                state:{from : props.location}
            }}
            />
        )
    }
    />
);
}

export default PrivatRoute;