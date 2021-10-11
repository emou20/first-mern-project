import React from 'react';
import Header from '../component/Header';
import { useSelector } from 'react-redux';
import ListeUsers from './ListeUsers';

const Accueil = (props) => {

    const loggedIn = useSelector(state => state.loggedIn);
    if (!loggedIn) {
        props.history.push('/login');
    }

   
    return (
        <div>
            <Header />
            <ListeUsers />
        </div>
    );
};

export default Accueil;