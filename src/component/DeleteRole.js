import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeleteRole = (props) => {

    const [msgNoDeleted, setMsgNoDeleted] = useState('');
    const DeleteUser = () => {
        const idRole = props.idRole;
        axios.delete(
            `http://localhost:5000/api/roles/delete/${idRole}`
        ).then(res => {
            if (res.status === 200) {
                props.changeEtatDelete(true);
            } else {
                if (res.status === 201) {
                    setMsgNoDeleted("Vous pouver pas supprimé ce role car il est affecté a un utlisateur !");
                    alert("Vous pouver pas supprimé ce role car il est affecté a un utlisateur !");
                } else {
                    console.log(res.data)
                }
            }
        });
    }
    return (
        <div className="contDeleteUser">
            <button onClick={() => DeleteUser()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeleteRole;