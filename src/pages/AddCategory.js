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

const AddCategory = () => {
    const [nameCategory, setNameCategory] = useState('');
    const [errorName, setErrorName] = useState("");
    const [propGlob, setPropGlob] = useState("");
    const [add, setadd] = useState(false);

    const verifForm = () => {
        let errorSend = false;
        if (nameCategory === "") {
            setErrorName("Le champ Nom de la catégorie est vide !");
            errorSend = true;
        } else {
            setErrorName("")
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
            const data = { nameCategory }
            axios.post('http://localhost:5000/api/category/addCategory', data)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                        setadd(true);
                        setTimeout(function () {
                            setadd(false);
                            setNameCategory("");
                        
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
        setNameCategory("");
        
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
                            <div>Catégorie ajouté avec succées</div>
                        ) : (
                            <form noValidate autoComplete="off">
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Nom de la catégorie</InputLabel>
                                        <Input
                                            id="name"
                                            value={nameCategory}
                                            onChange={(e) => setNameCategory(e.target.value)}
                                            name="name"

                                        />
                                    </FormControl>
                                    <div className="error">{errorName}</div>
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

export default AddCategory;