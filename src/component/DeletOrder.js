import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeletOrder = (props) => {
    const DeletOrder = () => {
        const idOrder = props.idOrder;
        axios.delete(
            `http://localhost:5000/api/order/${idOrder}`
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
            <button onClick={() => DeletOrder()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeletOrder;