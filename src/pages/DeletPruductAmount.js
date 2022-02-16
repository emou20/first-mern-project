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
import { useSelector } from 'react-redux';

import Header from '../component/Header';
import ProductName from '../component/ProductName';

const DeletPruductAmount = () => {
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState('');
    const [pattern, setPattern] = useState('');
    const [amount, setAmount] = useState(0);

    const [probGlob, setProbGlob] = useState('');
    const [delet, setDelet] = useState(false);

    const [errorIdProduct, setErrorIdProduct] = useState('');
    const [errorPattern, setErrorPattern] = useState('');
    const [errorAmount, setErrorAmount] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/stock/getStocksProducts', { withCredentials: true, credentials: 'include' }
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

            for(const element of products ){
                if(element.amount< amount){
                    setErrorAmount("Vous ne pouvez pas métre une quantité a supprimer plus grande que la quantité du stock !");
                    errorSend = true;
                }else{
                    setErrorAmount("")
                }

            }
           
        }
        if (pattern === "") {

            setErrorPattern("Le champ Motif est vide !");
            errorSend = true;

        } else {
            setErrorPattern("")
        }



        if (errorSend) {
            return false
        } else {
            return true;
        }
    }

    const idUser = useSelector(state => state.idUser);
    const sendInfo = () => {
        const isValid = verifForm();

        if (isValid) {

            
            const data = { idProduct,idUser , deletedAmount: amount, pattern }
            axios.post('http://localhost:5000/api/stock/deletProductAmount/', data)
                .then(response => {
                    if (response.status === 201) {
                        setDelet(true);
                        setTimeout(function () {
                            setDelet(false);
                            setIdProduct('');
                            setAmount(0);
                            setPattern('');

                        }, 3000);
                    } else {
                        setProbGlob("Problème de suppression, essayer une autre fois !");
                    }

                });
        } else {
            console.log("error input")
        }
    }

    const clearForm = () => {
        setIdProduct('');
        setAmount(0);
        setPattern('');
    }

    return (
        <div>
            <Header />
            <h1>Suppression de stock</h1>
            <Container>
                <Card>
                    <CardContent>
                        {delet ? (<div>Quantité supprimer avec succée !</div>) : (
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
                                                            <MenuItem key={index} value={el.idProduct._id}>{el.idProduct.nom}</MenuItem>
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
                                            <InputLabel htmlFor="standard-adornment-amount">Quantité à supprimer en KG</InputLabel>
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
                                            <InputLabel htmlFor="standard-adornment-suppression">Motif de suppression </InputLabel>
                                            <Select
                                                labelId="select1-label"
                                                id="select2"
                                                value={pattern}
                                                onChange={(e) => setPattern(e.target.value)}
                                            >
                                                <MenuItem key="1" value="Perte DLC">Perte DLC</MenuItem>
                                                <MenuItem key="2" value="Perte etat de produit">Perte etat de produit</MenuItem>
                                                <MenuItem key="3" value="Rectification stock">Rectification stock</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <div className="error">{errorPattern}</div>
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

export default DeletPruductAmount;