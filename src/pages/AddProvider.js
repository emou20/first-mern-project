import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Header from '../component/Header';

const AddProvider = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [mail, setMail] = useState('');
    const [taxNumber, setTaxNumber] = useState('');

    const [errorName, setErrorName] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAdress, setErrorAdress] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [errorTaxNumber, setErrorTaxNumber] = useState("");

    const [propGlob, setPropGlob] = useState("");
    const [add, setadd] = useState(false);

    const verifForm = () => {
        let errorSend = false;
        if (name === "") {
            setErrorName("Le champ Nom est vide !");
            errorSend = true;
        } else {
            setErrorName("")
        }

        if (phone === "") {
            setErrorPhone("Le champ Numero de téléphone est vide !");
            errorSend = true;
        } else {
            setErrorPhone("")
        }

        if (adress === "") {
            setErrorAdress("Le champ Adresse est vide !");
            errorSend = true;
        } else {
            setErrorAdress("")
        }

        if (mail === "") {
            setErrorMail("Le champ Mail est vide !");
        } else {
            if (mail.includes("@") === false) {
                setErrorMail("Le champ Mail est invalide !");
                errorSend = true;
            } else {
                setErrorMail("")
            }

        }

        if (taxNumber === "") {
            setErrorTaxNumber("Le champ Matricule fiscale est vide !");
        } else {
            setErrorTaxNumber("")
        }

        if (errorSend) {
            return false
        } else {
            return true;
        }
    }

    const sendInfo = () => {
        const isValid = verifForm();
        if (isValid) {
            const data = { name, phone, adress, mail, taxNumber }
            axios.post('http://localhost:5000/api/provider/add/', data)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                        setadd(true);
                        setTimeout(function () {
                            setadd(false);
                            setName("");
                            setPhone("");
                            setAdress("");
                            setMail("");
                            setTaxNumber("");

                        }, 3000);

                    } else {
                        setPropGlob("Problème d'ajout, essayer une autre fois !");
                    }
                }
                );
        } else {
            console.log("error input")
        }
    }

    const clearForm = () => {
        setName("");
        setPhone("");
        setAdress("");
        setMail("");
        setTaxNumber("");
    }
    return (
        <div>
            <Header />
            <h1>Ajout d'un fournisseur</h1>

            <Container>
                <Card>
                    <CardContent>
                        <div>{propGlob}</div>
                        {add ? (
                            <div>Fournisseur ajouté avec succées</div>
                        ) : (
                            <form noValidate autoComplete="off">
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Nom du fournisseur</InputLabel>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            name="name"

                                        />
                                    </FormControl>
                                    <div className="error">{errorName}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Numéro de téléphone du fournisseur</InputLabel>
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
                                        <InputLabel htmlFor="standard-adornment-amount">Adresse du fournisseur</InputLabel>
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
                                        <InputLabel htmlFor="standard-adornment-amount">Mail du fournisseur</InputLabel>
                                        <Input
                                            id="mail"
                                            value={mail}
                                            onChange={(e) => setMail(e.target.value)}
                                            name="mail"

                                        />
                                    </FormControl>
                                    <div className="error">{errorMail}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Numéro de matricule fiscale</InputLabel>
                                        <Input
                                            id="taxNumber"
                                            value={taxNumber}
                                            onChange={(e) => setTaxNumber(e.target.value)}
                                            name="taxNumber"

                                        />
                                    </FormControl>
                                    <div className="error">{errorTaxNumber}</div>
                                </div>
                                <div className="contBttEnvoyer continput1000">
                                    <Button variant="contained" color="primary" disableElevation onClick={() => sendInfo()}>
                                        Enregistrer
                                    </Button>

                                    <Button variant="contained" color="secondary" disableElevation onClick={() => clearForm()}>
                                        Annuler
                                    </Button>
                                </div>
                            </form>
                        )}

                    </CardContent>
                </Card>
            </Container>

        </div>
    );
};

export default AddProvider;