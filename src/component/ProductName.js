import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductName = (props) => {

    const [nameProduct, setNameProduct] = useState('');
    useEffect(() => {
        let id = props.idProduct;
        axios.get(`http://localhost:5000/api/product/${id}`, { withCredentials: true, credentials: 'include' })
        .then(response => {
            if (response.status === 200) {
                setNameProduct(response.data.nom)
            }else{
                console.log(response.data)
            }
        })

    },[])

    return (
        <div>
           {nameProduct} 
        </div>
    );
};

export default ProductName;