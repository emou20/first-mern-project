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

const ListTransaction = () => {
    const [transaction, setTransaction] = useState([]);
    const [noTransaction, setNoTransaction] = useState("");
    const [loading, setLoading] = useState(true);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stock/', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setTransaction(response.data);
                    if (response.data.length === 0) {
                        setNoTransaction("Pas de transaction")
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
            <h1>Liste des transactions</h1>
            <Container>
                    
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    
                                    <TableCell align="left">ID produit</TableCell>
                                    <TableCell align="left">Produit</TableCell>
                                    <TableCell align="left">Quantitée Ajouter en KG</TableCell>
                                    <TableCell align="left">Prix achat HT</TableCell>
                                    <TableCell align="left">Tax TVA</TableCell>
                                    <TableCell align="left">DLC</TableCell>
                                    <TableCell align="left">Marge en DT</TableCell>
                                    <TableCell align="left">Date de créaction</TableCell>

                                </TableRow>
                            </TableHead>
                            
                            {transaction.length === 0 ?
                                (
                                    <div>{noTransaction}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{el.idProduct} </TableCell>
                                                <TableCell align="left"><ProductName idProduct={el.idProduct} /></TableCell>
                                                <TableCell align="left">+ {el.amount}</TableCell>
                                                <TableCell align="left">{el.buyingPriceHt}</TableCell>
                                                <TableCell align="left">{el.taxTva}</TableCell>
                                                <TableCell align="left">{el.dlc}</TableCell>
                                                <TableCell align="left">{el.margin}</TableCell>
                                                <TableCell align="left">{el.createdAt}</TableCell>
                                                
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                        {loading ? <div style={{textAlign : "center", width: "100%"}}>Loading</div> : <div></div>}
                    </TableContainer>
                    
                    <Pagination items={transaction} onChangePage={onChangePage.bind()} />
                </Container>
            
        </div>
    );
};

export default ListTransaction;