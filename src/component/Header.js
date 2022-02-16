import React from 'react';
import BlockUserHeader from './BlockUserHeader';
import { Link } from 'react-router-dom';
import { FaAward, FaHome, FaRaspberryPi, FaUserAlt, FaStore,FaShoppingBasket, FaCashRegister,FaUserTie } from "react-icons/fa";
import Cookies from 'js-cookie';

const Header = () => {
    const jwt = Cookies.get('jwt');
    if(jwt === undefined) {window.location.href = "/login"};
    return (
        <div className="contHeader">
            <div className="contUserHeaderModule">
                <BlockUserHeader />
                <ul>
                    <li>
                    <Link to="/ListCategorie" className="linkRole"><FaUserTie /> Catégorie</Link>
                    </li>
                    <li>
                    <Link to="/ListClients" className="linkRole"><FaUserTie /> Clients</Link>
                    </li>
                    <li>
                    <Link to="/ListStock" className="linkRole"><FaCashRegister /> Stock</Link>
                    </li>
                    <li>
                    <Link to="/ListCurrentOrder" className="linkRole"><FaShoppingBasket /> Ordre commande fournisseur</Link>
                    </li>
                    <li>
                    <Link to="/ListProviders" className="linkRole"><FaStore /> Fournisseurs</Link>
                    </li>
                    <li>
                    <Link to="/ListProducts" className="linkRole"><FaRaspberryPi /> Produits</Link>
                    </li>
                    <li>
                    <Link to="/ListeUsers" className="linkRole"><FaUserAlt /> Utilisateurs</Link>
                    </li>
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