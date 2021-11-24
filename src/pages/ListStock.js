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
import { FaPlusCircle,FaRegTrashAlt, FaListUl } from "react-icons/fa";
import Header from '../component/Header';
import ProductName from '../component/ProductName';

const ListStock = () => {
    const [stock, setStock] = useState([]);
    const [noStock, setNoStock] = useState("");
    const [loading, setLoading] = useState(true);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stock/getStocksProducts', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setStock(response.data);
                    if (response.data.length === 0) {
                        setNoStock("Pas de produits dans le stock")
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
            <h1>Stock Produits</h1>
            <div>
                <Container>
                    <Link to="/ListTransaction" className="linkAdd"> <FaListUl /> Liste des transaction</Link>
                    <Link to="/AddTransaction" className="linkAdd"> <FaPlusCircle /> Ajouter une transaction</Link>
                    <Link to="/ListDeletedStock" className="linkAdd"> <FaListUl /> Liste de suppression de quantitées</Link>
                    <Link to="/DeletPruductAmount" className="linkAdd"> <FaRegTrashAlt /> Supprimer une quantité de stock</Link>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    
                                    <TableCell align="left">ID produit</TableCell>
                                    <TableCell align="left">Produit</TableCell>
                                    <TableCell align="left">Quantitée disponible en KG</TableCell>
                                    <TableCell align="left">Prix TTC</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            {stock.length === 0 ?
                                (
                                    <div>{noStock}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{el.idProduct} </TableCell>
                                                <TableCell align="left"><ProductName idProduct={el.idProduct} /></TableCell>
                                                <TableCell align="left">{el.amount}</TableCell>
                                                <TableCell align="left">{el.priceTtc}</TableCell>
                                                
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                        {loading ? <div style={{textAlign : "center", width: "100%"}}>Loading</div> : <div></div>}
                    </TableContainer>
                    
                    <Pagination items={stock} onChangePage={onChangePage.bind()} />
                </Container>



            </div>
            
        </div>
    );
};

export default ListStock;