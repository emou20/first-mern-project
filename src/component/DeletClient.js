import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeletClient = (props) => {

    const DeletClient = () => {
        const idClient = props.idClient;
        axios.delete(
            `http://localhost:5000/api/client/${idClient}`
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
            <button onClick={() => DeletClient()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeletClient;