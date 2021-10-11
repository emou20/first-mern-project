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

import AddRole from '../component/AddRole';
import EditRole from '../component/EditRole';
import DeleteRole from '../component/DeleteRole';
import Pagination from '../component/Pagination';

import Header from '../component/Header';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [changeValue, setChangeValue] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/roles/',{withCredentials: true, credentials: 'include'}
        )
            .then(response => {
                if (response.status === 200) {
                    setRoles(response.data);
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
        <div className="contGlob">
            <Header />
            <h1>Liste des roles</h1>

            <div>
                    <Container>
                        <AddRole  changeEtatRole={changeEtat.bind()}  />
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Role</TableCell>
                                        <TableCell align="right">Coefition</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pageOfItems.map((el, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{el.nameGroupe}</TableCell>
                                            <TableCell align="right">{el.coefition}</TableCell>
                                            <TableCell align="right"><EditRole idRole={el._id} changeEtatEdit={changeEtat.bind()} /></TableCell>
                                            <TableCell align="right"><DeleteRole idRole={el._id} changeEtatDelete={changeEtat.bind()}/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination items={roles} onChangePage={onChangePage.bind()} />
                    </Container>
                </div>

        </div>
    );
};

export default Roles;