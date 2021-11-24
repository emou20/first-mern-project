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
import { FaPlusCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

import Header from '../component/Header';
import DeleteProvider from '../component/DeleteProvider'

const ListProviders = () => {
    const [providers, setProviders] = useState([]);
    const [noProviders, setNoProviders] = useState("");
    const [loading, setLoading] = useState(true);
    const [changeValue, setChangeValue] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/api/provider/', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setProviders(response.data);
                    if (response.data.length === 0) {
                        setNoProviders("Pas dde produits dans la base")
                    }
                } else {
                    console.log(response.data)
                }

            });
    }, [changeValue]);

    const changeEtat = (value) => {
        value === true && setChangeValue(!changeValue);
    }
    const onChangePage = (pageOfItems) => {
        setPageOfItems(pageOfItems);
    }

    return (
        <div>
            <Header />
            <h1>Liste des fournisseurs</h1>
            <div>
                <Container>
                    <Link to="/AddProvider" className="linkAdd"> <FaPlusCircle /> Ajouter un fournisseur</Link>

                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    
                                    <TableCell align="right">Nom</TableCell>
                                    <TableCell align="right">Tél</TableCell>
                                    <TableCell align="right">Adresse</TableCell>
                                    <TableCell align="right">Mail</TableCell>
                                    <TableCell align="right">Mat.Fiscale</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            
                            {providers.length === 0 ?
                                (
                                    <div>{noProviders}</div>
                                ) : (
                                    <TableBody>
                                        {pageOfItems.map((el, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="right">{el.name}</TableCell>
                                                <TableCell align="right">{el.phone}</TableCell>
                                                <TableCell align="right">{el.adress}</TableCell>
                                                <TableCell align="right">{el.mail}</TableCell>
                                                <TableCell align="right">{el.taxNumber}</TableCell>
                                                <TableCell align="right"><Link to={`/EditProvider/${el._id}`}><FaUserEdit /></Link> </TableCell>
                                                <TableCell align="right"><DeleteProvider idProvider={el._id} changeEtatDelete={changeEtat.bind()} /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )

                            }

                        </Table>
                        {loading ? <div style={{textAlign : "center", width: "100%"}}>Loading</div> : <div></div>}
                    </TableContainer>
                    
                    <Pagination items={providers} onChangePage={onChangePage.bind()} />
                </Container>



            </div>
            
        </div>
    );
};

export default ListProviders;