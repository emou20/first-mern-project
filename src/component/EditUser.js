import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";

const EditUser = (props) => {
    const [show, setShow] = useState(false);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [date, setdate] = useState("");
    const [adress, setadress] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [probGlob, setProbGlob] = useState("");


    useEffect(() => {
       /* axios({
            method: 'get',
            url: `http://localhost:5000/api/user/${props.idUser}`
        })
            .then(response => {
                if (response.status === 200) {
                    setfirstName(response.data.firstName);
                    setlastName(response.data.lastName);
                    setdate(response.data.date);
                    setadress(response.data.adress);
                    setemail(response.data.email);
                    setphone(response.data.phone);

                } else {
                    console.log(response.data)
                }
                
            });*/
            
    }, []);

    const updateInfo = () => {
        const inscription = { firstName, lastName, date, adress, email, phone };
        axios.put(`http://localhost:5000/api/user/${props.idUser}`, inscription)
        .then(response => {
            console.log(response.status) ;
            if(response.status !== 500){
                setShow(false);
                props.changeEtatEdit(true);
            } else{
                setProbGlob("Problème d'inscription, essayer une autre fois !");
                console.log(response.data);
            }
        });
    }

    const showFormEdit = () => {
        setShow(true);
        try {
            axios.get(`http://localhost:5000/api/user/${props.idUser}`)
                .then(response => {
                    if (response.status === 200) {
                        setfirstName(response.data.firstName);
                        setlastName(response.data.lastName);
                        setdate(response.data.date);
                        setadress(response.data.adress);
                        setemail(response.data.email);
                        setphone(response.data.phone);
    
                    } else {
                        console.log(response.data)
                    }
                    
                });
        }catch(err){
            console.log(err);

        }
        
    }
    const closePopUp = () => {
        setShow(false);
    }
    return (
        <div className="contEditUser">
            <button className="bttIcone" onClick={() => showFormEdit()}><FaUserEdit /></button>
            {show &&
            <div className="backBlack">
                <div className="contPoupFormEdit">
                    <Container>
                    <h3>Modification de l'utilisateur {firstName} {lastName}</h3>
                        <Card>
                            <CardContent>
                                
                                <div>{probGlob}</div>
                                <form noValidate autoComplete="off">
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre nom</InputLabel>
                                            <Input
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) => setfirstName(e.target.value)}
                                                name="firstName"

                                            />
                                        </FormControl>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre prénom</InputLabel>
                                            <Input
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => setlastName(e.target.value)}
                                                name="lastName"

                                            />
                                        </FormControl>
                                    </div>

                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre date de naissance</InputLabel>
                                            <Input
                                                id="date"
                                                value={date}
                                                onChange={(e) => setdate(e.target.value)}
                                                name="date"

                                            />
                                        </FormControl>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre adresse</InputLabel>
                                            <Input
                                                id="adress"
                                                value={adress}
                                                onChange={(e) => setadress(e.target.value)}
                                                name="adress"

                                            />
                                        </FormControl>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre email</InputLabel>
                                            <Input
                                                id="email"
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                                name="email"

                                            />
                                        </FormControl>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre numéro de téléphone</InputLabel>
                                            <Input
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setphone(e.target.value)}
                                                name="phone"

                                            />
                                        </FormControl>
                                    </div>

                                    <div className="contBttEnvoyer">
                                        <Button variant="contained" color="primary" className="validBtt" disableElevation onClick={() => updateInfo()}>
                                            Enregistrer
                                        </Button>

                                        <Button variant="contained" color="secondary" disableElevation onClick={() => closePopUp()}>
                                            Annuler
                                        </Button>
                                    </div>

                                </form>
                            </CardContent>

                        </Card>
                    </Container>
                </div>
            </div>
            }


        </div>
    );
};

export default EditUser;