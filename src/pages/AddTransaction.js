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
import {KeyboardDatePicker} from '@material-ui/pickers';

import Header from '../component/Header'

const AddTransaction = () => {
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState('');
    const [amount, setAmount] = useState(0);
    const [buyingPriceHt, setBuyingPriceHt] = useState('');
    const [taxTva, setTaxTva] = useState('');
    const [dlc, setDlc] = useState(new Date());
    const [margin, setMargin] = useState('');

    const [probGlob, setProbGlob] = useState('');
    const [add, setAdd] = useState(false);

    const [errorIdProduct, setErrorIdProduct] = useState('');
    const [errorBuyingPriceHt, setErrorBuyingPriceHt] = useState('');
    const [errorAmount, setErrorAmount] = useState('');
    const [errorDlc, setErrorDlc] = useState('');
    const [errorTaxTva, setErrorTaxTva] = useState('');
    const [errorMargin, setErrorMargin] = useState('');

    useEffect(() => {

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
        if (idProduct === "") {

            setErrorIdProduct("Le champ produit est vide !");
            errorSend = true;

        } else {
            setErrorIdProduct("")
        }
        if (amount === "") {

            setErrorAmount("Le champ Quantité est vide !");
            errorSend = true;

        } else {
            setErrorAmount("")
        }
        if (buyingPriceHt === "") {

            setErrorBuyingPriceHt("Le champ prix est vide !");
            errorSend = true;

        } else {
            setErrorBuyingPriceHt("")
        }
        if (taxTva === "") {

            setErrorTaxTva("Le champ Taxe est vide !");
            errorSend = true;

        } else {
            setErrorTaxTva("")
        }
        if (dlc === "") {

            setErrorDlc("Le champ Taxe est vide !");
            errorSend = true;

        } else {
            setErrorDlc("")
        }
        if (margin === "") {

            setErrorMargin("Le champ Taxe est vide !");
            errorSend = true;

        } else {
            setErrorMargin("")
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

            const data = { idProduct, amount, buyingPriceHt, taxTva,dlc,margin }
            axios.post('http://localhost:5000/api/stock/add/', data)
                .then(response => {
                    if (response.status === 201) {
                        setAdd(true);
                        setTimeout(function () {
                            setAdd(false);
                            setIdProduct('');
                            setAmount(0);
                            setBuyingPriceHt('');
                            setTaxTva('');
                            setDlc(new Date());
                            setMargin('');

                        }, 3000);
                    } else {
                        setProbGlob("Problème d'ajout, essayer une autre fois !");
                    }

                });
        } else {
            console.log("error input")
        }
    }

    const clearForm = () => {
        setIdProduct('');
        setAmount(0);
        setBuyingPriceHt('');
        setTaxTva('');
        setDlc(new Date());
        setMargin('');
    }

    return (
        <div>
            <Header />
            <h1>Ajout d'une transaction</h1>
            <Container>
                <Card>
                    <CardContent>
                        {add ? (<div>Transaction ajouté avec succée !</div>) : (
                            <>
                                <div>{probGlob}</div>
                                <form noValidate autoComplete="off">
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Produit</InputLabel>
                                            <Select
                                                labelId="select1-label"
                                                id="select1"
                                                value={idProduct}
                                                onChange={(e) => setIdProduct(e.target.value)}
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
                                        <div className="error">{errorIdProduct}</div>
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
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-buyingPriceHt">Prix d'achat ht</InputLabel>
                                            <Input
                                                id="buyingPriceHt"
                                                value={buyingPriceHt}
                                                onChange={(e) => setBuyingPriceHt(e.target.value)}
                                                name="buyingPriceHt"

                                            />
                                        </FormControl>
                                        <div className="error">{errorBuyingPriceHt}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-taxTva">Tax TVA</InputLabel>
                                            <Input
                                                id="taxTva"
                                                value={taxTva}
                                                onChange={(e) => setTaxTva(e.target.value)}
                                                name="taxTva"

                                            />
                                        </FormControl>
                                        <div className="error">{errorTaxTva}</div>
                                    </div>
                                    <div className="continput datepicker">

                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date limite de consomation"
                                            format="dd/MM/yyyy"
                                            value={dlc}
                                            onChange={(dlc) => setDlc(dlc)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />

                                        <div className="error">{errorDlc}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-margin">Marge</InputLabel>
                                            <Input
                                                id="margin"
                                                value={margin}
                                                onChange={(e) => setMargin(e.target.value)}
                                                name="margin"

                                            />
                                        </FormControl>
                                        <div className="error">{errorMargin}</div>
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

export default AddTransaction;