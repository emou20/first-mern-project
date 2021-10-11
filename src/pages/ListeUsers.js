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

import EditUser from '../component/EditUser';
import DeleteUser from '../component/DeleteUser';
import EditUserRole from '../component/EditUserRole';
import Inscription from './Inscription' ;
import Pagination from '../component/Pagination';



const ListeUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [changeValue, setChangeValue] = useState(false);
    const [noUsers, setNoUsers] = useState("");
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/',{withCredentials: true, credentials: 'include'}
        )
            .then(response => {
                if (response.status === 200) {
                    setUsers(response.data);
                    if (response.data.length === 0){
                        setNoUsers("Pas d'utilisateurs dans la base")
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

console.log(pageOfItems.length);
    return (

        <div>
            <h1>Liste des utilisateurs</h1>
            
                <div>
                    <Container>
                        <Inscription changeEtatListe={changeEtat.bind()}/>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>FirstName</TableCell>
                                        <TableCell align="right">LastName</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Adress</TableCell>
                                        <TableCell align="right">Phone</TableCell>
                                        <TableCell align="right">Role</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pageOfItems.map((el, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{el.firstName}</TableCell>
                                            <TableCell align="right">{el.lastName}</TableCell>
                                            <TableCell align="right">{el.date}</TableCell>
                                            <TableCell align="right">{el.email}</TableCell>
                                            <TableCell align="right">{el.adress}</TableCell>
                                            <TableCell align="right">{el.phone}</TableCell>
                                            <TableCell align="right">
                                                <EditUserRole role={el.role} idUser={el._id}  changeEtatEdit={changeEtat.bind()}/>
                                           </TableCell>
                                            <TableCell align="right"><EditUser idUser={el._id} changeEtatEdit={changeEtat.bind()} /></TableCell>
                                            <TableCell align="right"><DeleteUser idUser={el._id} changeEtatDelete={changeEtat.bind()} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination items={users} onChangePage={onChangePage.bind()} />
                    </Container>
                    


                </div>
            

            
        </div>
    );
};

export default ListeUsers;