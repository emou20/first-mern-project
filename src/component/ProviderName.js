import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProviderName = (props) => {
    const [nameProvider, setNameProvider] = useState('');
    useEffect(() => {
        let id = props.idProvider;
        axios.get(`http://localhost:5000/api/provider/${id}`, { withCredentials: true, credentials: 'include' })
        .then(response => {
            if (response.status === 200) {
                setNameProvider(response.data.name)
            }else{
                console.log(response.data)
            }
        })

    },[])
    return (
        <div>
            {nameProvider}
        </div>
    );
};

export default ProviderName;