import React from 'react';

const NotFound = (props) => {
    setTimeout(function(){  
        props.history.push('./');
    }, 3000);
    return (
        <div>
            <h1>Page non trouvé ! </h1>
        </div>
    );
};

export default NotFound;