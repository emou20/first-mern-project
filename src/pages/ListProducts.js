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
import DeleteProduct from '../component/DeleteProduct'
import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";


import Header from '../component/Header'

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [noProducts, setNoProducts] = useState("");
    const [changeValue, setChangeValue] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/product/', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data);
                    if (response.data.length === 0) {
                        setNoProducts("Pas dde produits dans la base")
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
        console.log("pageOfItems ===>", pageOfItems)
        // update state with new page of items
        setPageOfItems(pageOfItems);
    }
    return (
        <div>
            <Header />
            <h1>Liste des Produits</h1>
            <div>
                <Container>
                    <Link to="/AjoutProduct" className="linkAdd"> <FaPlusCircle /> Ajouter un produit</Link>

                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Photo</TableCell>
                                    <TableCell align="right">Nom</TableCell>
                                    <TableCell align="right">Ref</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            {products.length === 0 ?
                                (
                                    <div>{noProducts}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row"><img width="50" height="50" src={`${process.env.REACT_APP_API_URL}/upload/product/${el.foto}`} alt="" /></TableCell>
                                                <TableCell align="right">{el.nom}</TableCell>
                                                <TableCell align="right">{el.ref}</TableCell>
                                                <TableCell align="right">{el.desc}</TableCell>
                                                <TableCell align="right"><Link to={`/editProduct/${el._id}`}><FaUserEdit /></Link> </TableCell>
                                                <TableCell align="right"><DeleteProduct idProduct={el._id} changeEtatDelete={changeEtat.bind()} /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                    </TableContainer>
                    <Pagination items={products} onChangePage={onChangePage.bind()} />
                </Container>



            </div>
        </div>
    );
};

export default ListProducts;