import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@mui/material/TextField';


import { useDispatch } from 'react-redux';
import addIdUserConnected from '../actions/addIdUserConnected';

const Authentification = (props) => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    const [errorLogin, setErrorLogin] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [idUser, setIdUser] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if(idUser !== ""){
            dispatch(addIdUserConnected(idUser));
        }
    }, [dispatch, idUser]);


    const loginIn = () => {

        axios.post('http://localhost:5000/api/user/login/', {login, pass},{withCredentials: true, credentials: 'include'} )
        .then(response => {
            console.log(response.data.user);
            if (response.data.user) {
                setIdUser(response.data.user);
                props.history.push('./');
            } else {
                setErrorLogin(response.data.errors.login);
                setErrorPass(response.data.errors.pass);
            }
        }
        );
    }
    return (
        <div className="pageAuthen">
            <div className="contFormAuth">
                <Container>
                    <Card>
                        <CardContent>
                            <h4>Authentification</h4>
                            
                            <form noValidate autoComplete="off">
                                <div className="continput">
                                    <TextField
                                        id="outlined-search"
                                        label="Votre Identifiant"
                                        type="text"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                    />
                                </div>
                                <div className="error">{errorLogin}</div>
                                <div className="continput">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Votre mot de passe"
                                        type="password"
                                        autoComplete="current-password"
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </div>
                                <div className="error">{errorPass}</div>
                                <div className="contBttEnvoyer">
                                        <Button variant="contained" color="primary" disableElevation onClick={() => loginIn()}>
                                            Connecter
                                        </Button>
                                    </div>

                            </form>
                        </CardContent>
                    </Card>
                </Container>

            </div>
        </div>


    );
};

export default Authentification;