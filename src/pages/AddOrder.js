import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


//import { DatePicker } from "@material-ui/pickers";
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Header from '../component/Header';

const AddOrder = () => {
    const [product, setProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [provider, setProvider] = useState('');
    const [providers, setProviders] = useState([]);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    const [errorProduct, setErrorProduct] = useState('');
    const [errorProvider, setErrorProvider] = useState('');
    const [errorAmount, setErrorAmount] = useState('');
    const [probGlob, setProbGlob] = useState('');
    const [add, setAdd] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:5000/api/provider/', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setProviders(response.data);
                    console.log(response.data);

                } else {
                    console.log(response.data)
                }

            });

        axios.get('http://localhost:5000/api/product/', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data);
                    console.log(response.data);

                } else {
                    console.log(response.data)
                }

            });



    }, []);

    const verifForm = () => {
        let errorSend = false;
        if (product === "") {

            setErrorProduct("Le champ produit est vide !");
            errorSend = true;

        } else {
            setErrorProduct("")
        }
        if (provider === "") {

            setErrorProvider("Le champ fournisseur est vide !");
            errorSend = true;

        } else {
            setErrorProvider("")
        }
        if (amount === "") {

            setErrorAmount("Le champ quantité est vide !");
            errorSend = true;

        } else {
            setErrorAmount("")
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
            let idProvider = provider;
            let idProduct = product;

            const data = { idProvider, idProduct, amount, date }
            axios.post('http://localhost:5000/api/order/add/', data)
                .then(response => {
                    if (response.status === 201) {
                        setAdd(true);
                        setTimeout(function () {
                            setAdd(false);
                            setProduct("");
                            setProvider("");
                            setDate("");
                            setAmount("");
                            setProbGlob("");

                        }, 3000);
                    } else {
                        setProbGlob("Problème d'ajout, essayer une autre fois !");
                    }

                });
        } else {
            console.log("error input")
        }


    };

    const clearForm = () => {
        setProduct("");
        setProvider("");
        setDate("");
        setAmount("");
    }
    return (
        <div>
            <Header />
            <h1>Ajout d'une commande fournisseur</h1>
            <Container>
                <Card>
                    <CardContent>
                        {add ? (<div>Order ajouté avec succée !</div>) : (
                            <>
                                <div>{probGlob}</div>
                                <form noValidate autoComplete="off">
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Produit</InputLabel>
                                            <Select
                                                labelId="select1-label"
                                                id="select1"
                                                value={product}
                                                onChange={(e) => setProduct(e.target.value.toString())}
                                            >
                                                {products.length > 0 ?
                                                    (
                                                        products.map((el, index) => (
                                                            <MenuItem key={index} value={el._id}>{el.nom}</MenuItem>
                                                        ))
                                                    ) : (
                                                        <div>Pas de produits</div>
                                                    )

                                                }

                                            </Select>
                                        </FormControl>
                                        <div className="error">{errorProduct}</div>
                                    </div>

                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Fournisseur</InputLabel>
                                            <Select
                                                labelId="select2-label"
                                                id="select2"
                                                value={provider}
                                                onChange={(e) => setProvider(e.target.value.toString())}
                                            >
                                                {
                                                    providers.map((el, index) => (
                                                        <MenuItem key={index} value={el._id}>{el.name}</MenuItem>
                                                    ))}

                                            </Select>
                                        </FormControl>
                                        <div className="error">{errorProvider}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Quantité en KG</InputLabel>
                                            <Input
                                                id="amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                name="amount"

                                            />
                                        </FormControl>
                                        <div className="error">{errorAmount}</div>
                                    </div>
                                    <div className="continput datepicker">

                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date limite de livraison"
                                            format="dd/MM/yyyy"
                                            value={date}
                                            onChange={(date) => setDate(date)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />


                                    </div>
                                    <div className="contBttEnvoyer">
                                        <Button variant="contained" color="primary" disableElevation onClick={() => sendInfo()}>
                                            Enregistrer
                                        </Button>

                                        <Button variant="contained" color="secondary" disableElevation onClick={() => clearForm()}>
                                            Annuler
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}

                    </CardContent>
                </Card>
            </Container>

        </div>
    );
};

export default AddOrder;