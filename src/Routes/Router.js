import React from 'react';
import {Switch, Route } from 'react-router-dom';
import {PrivatRoute} from '../component/PrivatRoute'


import Accueil from "../pages/Accueil";
import Authentification from '../pages/Authentification';
import Roles from '../pages/Roles';
import Inscription from '../pages/Inscription';
import NotFound from '../pages/NotFound';
import EditUser from '../component/EditUser';
import ListeUsers from '../pages/ListeUsers';

import AddProduct from '../pages/AddProduct';
import ListProducts from '../pages/ListProducts';
import EditProduct from '../pages/EditProduct';

import ListProviders from '../pages/ListProviders';
import AddProvider from '../pages/AddProvider';
import EditProvider from '../pages/EditProvider';

import ListCurrentOrder from '../pages/ListCurrentOrder';
import AddOrder from '../pages/AddOrder';
import ListeHistoryOrder from '../pages/ListeHistoryOrder';

import AddTransaction from '../pages/AddTransaction';
import ListStock from '../pages/ListStock';
import ListTransaction from '../pages/ListTransaction';
import DeletPruductAmount from '../pages/DeletPruductAmount';
import ListDeletedStock from '../pages/ListDeletedStock';

import ListeCategorys from '../pages/ListeCategorys';
import AddCategory from '../pages/AddCategory';
import EditCategory from '../pages/EditCategory';

import ListClients from '../pages/ListClients';
import EditClient from '../pages/EditClient';

const Router = () => (
    
    <Switch>
        <Route exact path="/login" component={Authentification} />
        <PrivatRoute exact path="/" component={Accueil} />
        
        <PrivatRoute exact path="/Roles" component={Roles} />
        <PrivatRoute exact path="/Inscription" component={Inscription} />

        <PrivatRoute exact path="/ListCategorie" component={ListeCategorys} />
        <PrivatRoute exact path="/AddCateg" component={AddCategory} />
        <PrivatRoute exact path="/editCateg/:idCateg" component={EditCategory} />


        <PrivatRoute exact path="/ListeUsers" component={ListeUsers} />
        <PrivatRoute exact path="/editUser/:idUser" component={EditUser} />
        
        <PrivatRoute exact path="/AjoutProduct" component={AddProduct} />
        <PrivatRoute exact path="/ListProducts" component={ListProducts} />
        <PrivatRoute exact path="/editProduct/:idProduct" component={EditProduct} />

        <PrivatRoute exact path="/AddProvider" component={AddProvider} />
        <PrivatRoute exact path="/ListProviders" component={ListProviders} />
        <PrivatRoute exact path="/EditProvider/:idProvider" component={EditProvider} />

        <PrivatRoute exact path="/AddOrder" component={AddOrder} />
        <PrivatRoute exact path="/ListCurrentOrder" component={ListCurrentOrder} />
        <PrivatRoute exact path="/ListeHistoryOrder" component={ListeHistoryOrder} />

        
        <PrivatRoute exact path="/AddTransaction" component={AddTransaction} />
        <PrivatRoute exact path="/ListStock" component={ListStock} />
        <PrivatRoute exact path="/ListTransaction" component={ListTransaction} />
        <PrivatRoute exact path="/DeletPruductAmount" component={DeletPruductAmount} />
        <PrivatRoute exact path="/ListDeletedStock" component={ListDeletedStock} />
        
        <PrivatRoute exact path="/ListClients" component={ListClients} />
        <PrivatRoute exact path="/editClient/:idClient" component={EditClient} />

        <Route component={NotFound} />
    </Switch>
)

export default Router;