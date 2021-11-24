import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeleteProvider = (props) => {
    const DeleteProvider = () => {
        const idProvider = props.idProvider;
        axios.delete(
            `http://localhost:5000/api/provider/${idProvider}`
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
            <button onClick={() => DeleteProvider()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeleteProvider;