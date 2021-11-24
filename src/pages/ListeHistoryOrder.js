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

import Header from '../component/Header';
import ProductName from '../component/ProductName';
import ProviderName from '../component/ProviderName';
import DeletOrder from '../component/DeletOrder';

const ListeHistoryOrder = () => {

    const [historyOrder,setHistoryOrder] = useState([]);
    const [noOrder,setNoOrder] = useState('');
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/order/historyOrders', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setHistoryOrder(response.data);
                    if (response.data.length === 0) {
                        setNoOrder("Pas d'ordre dans la base")
                    }
                } else {
                    console.log(response.data)
                }

            });
    }, []);

    const onChangePage = (pageOfItems) => {
        setPageOfItems(pageOfItems);
    }
    
    return (
        <div>
            <Header />
            <h1>Historique des commandes fournisseurs validé</h1>
            <Container>
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
                                </TableRow>
                            </TableHead>
                            {historyOrder.length === 0 ?
                                (
                                    <div>{noOrder}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="right"><ProductName idProduct={el.idProduct} /></TableCell>
                                                <TableCell align="right"><ProviderName idProvider={el.idProvider} /></TableCell>
                                                <TableCell align="right">{el.amount}</TableCell>
                                                <TableCell align="right">{el.date}</TableCell>
                                                <TableCell align="right">{el.state==="1" ? (<div>Livré</div>) : (<div>Non Livré</div>)}</TableCell>
                                                <TableCell align="right"><DeletOrder idOrder={el._id}/></TableCell>
                                                
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                    </TableContainer>
                    <Pagination items={historyOrder} onChangePage={onChangePage.bind()} />
                </Container>
        </div>
    );
};

export default ListeHistoryOrder;