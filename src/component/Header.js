import React from 'react';
import BlockUserHeader from './BlockUserHeader';
import { Link } from 'react-router-dom';
import { FaAward, FaHome } from "react-icons/fa";


const Header = () => {
    return (
        <div className="contHeader">
            <div className="contUserHeaderModule">
                <BlockUserHeader />
                <ul>
                    <li>
                    <Link to="/Roles" className="linkRole"><FaAward /> Roles</Link>
                    </li>
                    <li>
                    <Link to="/" className="linkAcc"><FaHome /> Accueil</Link>
                    </li>
                
                </ul>
            </div>
        </div>
    );
};

export default Header;