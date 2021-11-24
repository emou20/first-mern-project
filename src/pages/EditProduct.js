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

const EditProduct = (props) => {

    const [nom, setNom] = useState('');
    const [ref, setRef] = useState('');
    const [desc, setDesc] = useState('');

    const [file, setFile] = useState('');
    const [localFoto, setLocalFoto] = useState('');
    const [fotoCarger, setFotoCarger] = useState(false);

    const [errorNom, setErrorNom] = useState("");
    const [errorRef, setErrorRef] = useState("");
    const [errorDesc, setErrorDesc] = useState("");
    const [errorFoto, setErrorFoto] = useState("");
    const [propGlob, setPropGlob] = useState("");

    useEffect(() => {
        console.log(props.match.params);
        axios({
            method: 'get',
            url: `http://localhost:5000/api/product/${props.match.params.idProduct}`
        })
            .then(response => {
                if (response.status === 200) {
                    setNom(response.data.nom);
                    setRef(response.data.ref);
                    setDesc(response.data.desc);
                    setLocalFoto(response.data.foto)

                } else {
                    console.log(response.data)
                }

            });

    }, []);

    const verifForm = () => {

        let errorSend = false;

        if (nom === "") {

            setErrorNom("Le champ Nom est vide !");
            errorSend = true;

        } else {
            setErrorNom("")
        }

        if (ref === "") {

            setErrorRef("Le champ Référence est vide !");
            errorSend = true;
        } else {
            setErrorRef("")
        }

        if (desc === "") {

            setErrorDesc("Le champ Description est vide !");
            errorSend = true;
        } else {
            setErrorDesc("")
        }

        if (localFoto === "") {

            setErrorFoto("La photo de produit est vide !");

        } else {
            setErrorFoto("")
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
            const data = new FormData();

            data.append("nom", nom);
            data.append("ref", ref);
            data.append("desc", desc);

            if (file) {
                data.append("file", file);
            } else {
                data.append("file", localFoto);
            }

            axios.put(`http://localhost:5000/api/product/${props.match.params.idProduct}`, data)
                .then(response => {
                    console.log(response.status);
                    if (response.status !== 500) {
                        console.log("ok")
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
        setNom("");
        setRef("");
        setDesc("");
        setLocalFoto("");
    }
    const handelPicture = (e) => {
        setLocalFoto(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setFotoCarger(true)
    }
    return (
        <div className="contAddRole">
            <Header />
            <h1>Modification d'un produit</h1>
            <Container>
                <Card>
                    <CardContent>
                        <div>{propGlob}</div>
                        <form noValidate autoComplete="off">
                            <div className="continput100">
                                <div className="contPhotoUser">
                                    {localFoto === '' || localFoto === undefined ? (
                                        <img src="../default-product.png" alt="" />
                                    ) : (
                                        fotoCarger ? <img src={localFoto} alt="" /> : <img src={`${process.env.REACT_APP_API_URL}/upload/product/${localFoto}`} alt="" />
                                    )

                                    }
                                    <div className="contInputPhoto">
                                        <input type="file" name="photo" onChange={(e) => handelPicture(e)} />
                                    </div>
                                    <div className="error">{errorFoto}</div>
                                </div>
                            </div>
                            <div className="rightCol">
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Nom du produit</InputLabel>
                                        <Input
                                            id="nom"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            name="nom"

                                        />
                                    </FormControl>
                                    <div className="error">{errorNom}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Référence du produit</InputLabel>
                                        <Input
                                            id="ref"
                                            value={ref}
                                            onChange={(e) => setRef(e.target.value)}
                                            name="ref"

                                        />
                                    </FormControl>
                                    <div className="error">{errorRef}</div>
                                </div>
                                <div className="continput1000">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Description du produit</InputLabel>
                                        <Input
                                            id="desc"
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                            name="desc"

                                        />
                                    </FormControl>
                                    <div className="error">{errorDesc}</div>
                                </div>

                                <div className="contBttEnvoyer continput1000">
                                    <Button variant="contained" color="primary" disableElevation onClick={() => updateInfo()}>
                                        Enregistrer
                                    </Button>

                                    <Button variant="contained" color="secondary" disableElevation onClick={() => clearForm()}>
                                        Annuler
                                    </Button>
                                </div>


                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default EditProduct;