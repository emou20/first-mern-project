import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeleteProduct = (props) => {
    const DeleteProduct = () => {
        const idProduct = props.idProduct;
        axios.delete(
            `http://localhost:5000/api/product/${idProduct}`
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
            <button onClick={() => DeleteProduct()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeleteProduct;