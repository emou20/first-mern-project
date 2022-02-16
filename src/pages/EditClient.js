import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Header from "../component/Header";

const EditClient = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [email, setEmail] = useState('');

    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAdress, setErrorAdress] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [propGlob, setPropGlob] = useState("");

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/client/${props.match.params.idClient}`
        })
            .then(response => {
                if (response.status === 200) {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setPhone(response.data.phone);
                    setAdress(response.data.adress);
                    setEmail(response.data.email);

                } else {
                    console.log(response.data)
                }

            });

    }, []);

    const verifForm = () => {
        let errorSend = false;
        if (firstName === "") {
            setErrorFirstName("Le champ Nom est vide !");
            errorSend = true;
        } else {
            setErrorFirstName("")
        }

        if (lastName === "") {
            setErrorLastName("Le champ Numero de téléphone est vide !");
            errorSend = true;
        } else {
            setErrorLastName("")
        }

        if (adress === "") {
            setErrorAdress("Le champ Adresse est vide !");
            errorSend = true;
        } else {
            setErrorAdress("")
        }

        if (email === "") {
            setErrorEmail("Le champ Mail est vide !");
        } else {
            if (email.includes("@") === false) {
                setErrorEmail("Le champ Mail est invalide !");
                errorSend = true;
            } else {
                setErrorEmail("")
            }

        }

        if (phone === "") {
            setErrorPhone("Le champ Matricule fiscale est vide !");
        } else {
            setErrorPhone("")
        }

        if (errorSend) {
            return false
        } else {
            return true;
        }
    }

    const updateInfo = () => {
        const isValid = verifForm();
        if (isValid) {
            const data = { firstName,lastName , phone, adress, email }
            axios.put(`http://localhost:5000/api/client/updateClientAdmin/${props.match.params.idClient}`, data)
            .then(response => {
                console.log(response.status);
                if (response.status !== 500) {
                    console.log("ok");
                    props.history.push("/ListClients")
                } else {
                    setPropGlob("Problème de mise a jour, essayer une autre fois !");
                    console.log(response.data);
                }
            });
        }else{
            console.log("error input")
        }
    }

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setAdress("");
        setEmail("");
    }


    return (
        <div>
            <Header />
            <h1>Modification d'un client</h1>
            <Container>
                <Card>
                    <CardContent>
                        <div>{propGlob}</div>
                        
                            <form noValidate autoComplete="off">
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Nom du client</InputLabel>
                                        <Input
                                            id="name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            name="name"

                                        />
                                    </FormControl>
                                    <div className="error">{errorFirstName}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Prénom du client</InputLabel>
                                        <Input
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            name="lastName"

                                        />
                                    </FormControl>
                                    <div className="error">{errorLastName}</div>
                                </div>

                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Numéro de téléphone du client</InputLabel>
                                        <Input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            name="phone"

                                        />
                                    </FormControl>
                                    <div className="error">{errorPhone}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Adresse du client</InputLabel>
                                        <Input
                                            id="adress"
                                            value={adress}
                                            onChange={(e) => setAdress(e.target.value)}
                                            name="adress"

                                        />
                                    </FormControl>
                                    <div className="error">{errorAdress}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Mail du client</InputLabel>
                                        <Input
                                            id="mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            name="mail"

                                        />
                                    </FormControl>
                                    <div className="error">{errorEmail}</div>
                                </div>
                                
                                <div className="contBttEnvoyer continput1000">
                                    <Button variant="contained" color="primary" disableElevation  onClick={() => updateInfo()}>
                                        Enregistrer
                                    </Button>

                                    <Button variant="contained" color="secondary" disableElevation onClick={() => clearForm()}>
                                        Annuler
                                    </Button>
                                </div>
                            </form>
                       

                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default EditClient;