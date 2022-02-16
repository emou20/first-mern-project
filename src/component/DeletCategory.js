import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const DeletCategory = (props) => {

    const DeleteCateg = () => {
        const idCateg = props.idCateg;
        axios.delete(
            `http://localhost:5000/api/category/${idCateg}`
        ).then(res => {
            if (res.status === 200) {
                props.changeEtatDelete(true);
            } else {
                if (res.status === 201) {
                   
                    alert("Vous pouver pas supprimé cette catégorie car il est affecté a un produit au minimum !");
                } else {
                    console.log(res.data.message);
                }
            }
        });
    }
    return (
        <div className="contDeleteUser">
            <button onClick={() => DeleteCateg()}><FaTrashAlt /></button>
        </div>
    );
};

export default DeletCategory;