import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Logout from './Logout';

const BlockUserHeader = () => {
    const [infoUser, setInfoUser] = useState({});

    const idUser = useSelector(state => state.idUser);
    

    useEffect(()=>{
        
        axios.get(`http://localhost:5000/api/user/${idUser}`,{withCredentials: true, credentials: 'include'})
        .then(res => {
            setInfoUser(res.data);
        });

    }, [idUser]);

    
    return (
        <div className="UserConnectBlock">
            
            Bienvenue Mr {infoUser.firstName}
            <Logout />
        </div>
    );
};

export default BlockUserHeader;