import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Header from '../component/Header';

const EditCategory = (props) => {
    const [nameCategory, setNameCategory] = useState('');
    const [errorName, setErrorName] = useState("");
    const [propGlob, setPropGlob] = useState("");
    const [edited, setEdited] = useState(false);



    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/category/${props.match.params.idCateg}`
        })
            .then(response => {
                if (response.status === 200) {
                    setNameCategory(response.data.nameCategory);
                } else {
                    console.log(response.data)
                }
            });
        
    }, []);


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

    const updateInfo = () => {
        const isValid = verifForm();
        if (isValid) {
            const data = { nameCategory }
            axios.put(`http://localhost:5000/api/category/${props.match.params.idCateg}`, data)
            .then(response => {
                console.log(response.status);
                if (response.status !== 500) {
                    console.log("ok");
                    setEdited(true);
                } else {
                    setPropGlob("Problème de mise a jour, essayer une autre fois !");
                    console.log(response.data);
                }
            });

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
                        {edited ? (
                            <div>Catégorie Modifier avec succées</div>
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
                                    <Button variant="contained" color="primary" disableElevation onClick={() => updateInfo()}>
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

export default EditCategory;