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

import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import DeletCategory from '../component/DeletCategory';

const ListeCategorys = () => {
    const [categorys, setCategorys] = useState([]);
    const [changeValue, setChangeValue] = useState(false);
    const [noCateg, setNoCateg] = useState("");
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/category/',{withCredentials: true, credentials: 'include'}
        )
            .then(response => {
                if (response.status === 200) {
                    setCategorys(response.data);
                    if (response.data.length === 0){
                        setNoCateg("Pas de catégories dans la base")
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
        setPageOfItems( pageOfItems );
    }


    return (
        <div>
            <Header />
            <h1>Liste des catégories</h1>
            
                <div>
                <Container>
                        <Link to="/AddCateg" className="linkAdd"><FaPlusCircle /> Ajouter une catégorie</Link>
                        
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Categorie</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pageOfItems.map((el, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{el.nameCategory}</TableCell>
                                            <TableCell align="right"><Link to={`/editCateg/${el._id}`}><FaUserEdit /></Link> </TableCell>
                                            <TableCell align="right"><DeletCategory idCateg={el._id} changeEtatDelete={changeEtat.bind()} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination items={categorys} onChangePage={onChangePage.bind()} />
                    </Container>
                </div>
            
        </div>
    );
};

export default ListeCategorys;