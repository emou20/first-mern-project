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

const ListDeletedStock = () => {
    const [deletedStock, setDeletedStock] = useState([]);
    const [noDeletedStock, setNoDeletedStock] = useState("");
    const [loading, setLoading] = useState(true);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stock/listeDeletProductAmount', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setDeletedStock(response.data);
                    if (response.data.length === 0) {
                        setNoDeletedStock("Pas de transaction")
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
            <h1>Liste des transactions de réduction de quantitées</h1>
            <Container>
                    
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    
                                    <TableCell align="left">ID produit</TableCell>
                                    <TableCell align="left">Produit</TableCell>
                                    <TableCell align="left">ID Utilisateur</TableCell>
                                    <TableCell align="left">Quantitée Supprimer en KG</TableCell>
                                    <TableCell align="left">Motif de suppression</TableCell>
                                    <TableCell align="left">Date de suppression</TableCell>


                                </TableRow>
                            </TableHead>
                            
                            {deletedStock.length === 0 ?
                                (
                                    <div>{noDeletedStock}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{el.idProduct._id} </TableCell>
                                                <TableCell align="left">{el.idProduct.nom}</TableCell>
                                                <TableCell align="left">{el.idUser}</TableCell>
                                                <TableCell align="left">- {el.deletedAmount}</TableCell>
                                                <TableCell align="left">{el.pattern}</TableCell>
                                                <TableCell align="left">{el.createdAt}</TableCell>
                                                
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                        {loading ? <div style={{textAlign : "center", width: "100%"}}>Loading</div> : <div></div>}
                    </TableContainer>
                    
                    <Pagination items={deletedStock} onChangePage={onChangePage.bind()} />
                </Container>
            
        </div>
    );
};

export default ListDeletedStock;