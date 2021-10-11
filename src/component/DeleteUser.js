import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeleteUser = (props) => {

    const DeleteUser = () => {
        const idUser = props.idUser;
        axios.delete(
            `http://localhost:5000/api/user/${idUser}`
        ).then(res => {
            if (res.status === 200) {
                props.changeEtatDelete(true);
            } else {
                console.log(res.data.message);
            }
        });
    }
    return (
        <div className="contDeleteUser">
            <button onClick={() => DeleteUser()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeleteUser;