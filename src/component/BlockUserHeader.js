import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Logout from './Logout';


const BlockUserHeader = () => {
    const [infoUser, setInfoUser] = useState({});

    const id = useSelector(state => state.idUser);
    
    console.log("Id user ===>",id);
    useEffect(()=>{
        
        axios.get(`http://localhost:5000/api/user/${id}`,{withCredentials: true, credentials: 'include'})
        .then(res => {
            setInfoUser(res.data);
        });

    }, [id]);

    console.log("infoUser ===>",infoUser);
    return (
        <div className="UserConnectBlock">
            <div className="conImgUser">
                <img src={`${process.env.REACT_APP_API_URL}/upload/${infoUser.foto}`} />
            </div>
            Bienvenue Mr {infoUser.firstName}
            <Logout />
        </div>
    );
};

export default BlockUserHeader;