import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Pagination from '../component/Pagination';

import { Link } from 'react-router-dom';
import { FaPlusCircle, FaHistory } from "react-icons/fa";

import Header from '../component/Header';
import ProductName from '../component/ProductName';
import ProviderName from '../component/ProviderName';
import OrderDelivered from '../component/OrderDelivered';
import OrderNotDelivered from '../component/OrderNotDelivered';


const ListCurrentOrder = () => {
    const [currentOrder,setCurrentOrder] = useState([]);
    const [noOrder,setNoOrder] = useState('');
    const [pageOfItems, setPageOfItems] = useState([]);
    const [changeValue, setChangeValue] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/order/currentOrders', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setCurrentOrder(response.data);
                    if (response.data.length === 0) {
                        setNoOrder("Pas d'ordre dans la base")
                    }
                } else {
                    console.log(response.data)
                }

            });
    }, [changeValue]);

    const changeEtat = (value) => {
        value === true && setChangeValue(!changeValue);
        console.log(changeValue);

    }

    const onChangePage = (pageOfItems) => {
        setPageOfItems(pageOfItems);
    }
    return (
        <div>
            <Header />
            <h1>Liste des commandes fournisseur en cour</h1>
            <Container>
                    <Link to="/AddOrder" className="linkAdd"> <FaPlusCircle /> Ajouter un Order de commande fournisseur</Link>
                    <Link to="/ListeHistoryOrder" className="linkAdd"> <FaHistory /> Historique des Orders de commandes fournisseurs validé</Link>

                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Nom produit</TableCell>
                                    <TableCell align="right">Nom fournisseur</TableCell>
                                    <TableCell align="right">Quantité en KG</TableCell>
                                    <TableCell align="right">Date de livraison </TableCell>
                                    <TableCell align="right">Etat </TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            {currentOrder.length === 0 ?
                                (
                                    <div>{noOrder}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="right">{el.idProduct.nom}</TableCell>
                                                <TableCell align="right">{el.idProvider.name}</TableCell>
                                                <TableCell align="right">{el.amount}</TableCell>
                                                <TableCell align="right">{el.date}</TableCell>
                                                <TableCell align="right">En cours </TableCell>
                                                <TableCell align="right"><OrderDelivered id={el._id} changeEtatEdit ={changeEtat.bind()} /></TableCell>
                                                <TableCell align="right"><OrderNotDelivered id={el._id} changeEtatEdit ={changeEtat.bind()} /></TableCell>
                                                <TableCell align="right"></TableCell>
                                                
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                    </TableContainer>
                    <Pagination items={currentOrder} onChangePage={onChangePage.bind()} />
                </Container>
        </div>
    );
};

export default ListCurrentOrder;