import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from "js-cookie";

import { useDispatch } from 'react-redux';
import clearUserId from '../actions/clearUserId';


import { useCookies } from 'react-cookie';

const Logout = () => {
    const [logout, setLogout] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const dispatch = useDispatch();
    useEffect(() => {

        if (logout) {
            dispatch(clearUserId());
            
        }
    }, [dispatch, logout]);


    const dremoveCookie = (key) => {
        removeCookie(key);
        if (window !== "undefined") {
          cookie.remove(key, { expires: 1 });
        }
      };

/* // methode de suppression de cookie du navigateur avec simple javascript // 
      const deleteAllCookies = () => {
        document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        console.log('cookie suprimer ! ')
    }*/

    const logOutFunction = () => {
        //deleteAllCookies();
        
        setLogout(true);
        dremoveCookie("jwt")  ;
        axios.get('http://localhost:5000/api/user/connexion/logout', { withCredentials: true, credentials: 'include' }).then(() => {
            
        }).catch((err) => console.log(err));
    }
    return (
        <div>
            <button onClick={logOutFunction}>Déconnexion</button>
        </div>
    );
};

export default Logout;