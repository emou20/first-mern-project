import React from 'react';
import axios from 'axios';

const OrderDelivered = (props) => {
    const choice = "1";
    const id = props.id;
    const sendUpdate = () => {
        axios.put(`http://localhost:5000/api/order/updateState/${id}`, {choice})
        .then(response => {
            if(response.status === 200){
                props.changeEtatEdit(true);
            } else{
                console.log("Problème , essayer une autre fois !");
            }
        });
    }
    return (
        <div>
            <button onClick={() => sendUpdate()}>Livré</button>
        </div>
    );
};

export default OrderDelivered;