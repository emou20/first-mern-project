import React from 'react';
import {Switch, Route } from 'react-router-dom';


import Accueil from "../pages/Accueil";
import Authentification from '../pages/Authentification';
import Roles from '../pages/Roles';
import Inscription from '../pages/Inscription';
import NotFound from '../pages/NotFound';

const Router = () => (
    <Switch>
        <Route exact path="/login" component={Authentification} />
        <Route exact path="/" component={Accueil} />
        <Route exact path="/Roles" component={Roles} />
        <Route exact path="/Inscription" component={Inscription} />
        <Route component={NotFound} />
    </Switch>
)

export default Router;