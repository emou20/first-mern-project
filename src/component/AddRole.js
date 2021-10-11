import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { FaPlusCircle } from "react-icons/fa";

const AddRole = (props) => {
    const [show, setShow] = useState(false);
    const [probGlob, setProbGlob] = useState("");
    const [nameGroupe, setNameGroupe] = useState("");
    const [coefition, setCoefition] = useState("");

    const addRoleFunction = () => {
        
        axios.post('http://localhost:5000/api/roles/create/', {nameGroupe, coefition})
            .then(response => {
                console.log(response.status);
                if (response.status === 201) {
                    setShow(false);
                    props.changeEtatRole(true);
                } else {
                    setProbGlob("Problème d'inscription, essayer une autre fois !");
                }
            }
            );
    }

    const showFormAdd = () => {
        setShow(true);
    }

    const closePopUp = () => {
        setShow(false);
    }
    return (
        <div className="contAddRole">
            <button className="bttRole" onClick={()=> showFormAdd()}><FaPlusCircle /> Ajouter un role</button>
            {show && 
                <div className="backBlack">
                    <div className="contPoupFormEdit">
                    <Container>
                        <h3>Ajout d'un role </h3>
                            <Card>
                                <CardContent>
                                    <div>{probGlob}</div>
                                    <form noValidate autoComplete="off">
                                        <div className="continput">
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="standard-adornment-amount">Role</InputLabel>
                                                <Input
                                                    id="nameGroupe"
                                                    value={nameGroupe}
                                                    onChange={(e) => setNameGroupe(e.target.value)}
                                                    name="nameGroupe"

                                                />
                                            </FormControl>
                                        </div>
                                        <div className="continput">
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="standard-adornment-amount">Coefition</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={coefition}
                                                onChange={(e) => setCoefition(e.target.value.toString())}
                                                >
                                               
                                                    <MenuItem value={0}>0</MenuItem>
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                    <MenuItem value={6}>6</MenuItem>
                                                    <MenuItem value={7}>7</MenuItem>
                                                    <MenuItem value={8}>8</MenuItem>
                                                    <MenuItem value={9}>9</MenuItem>
                                                
                                                
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="contBttEnvoyer">
                                            <Button variant="contained" color="primary" className="validBtt" disableElevation onClick={() => addRoleFunction()}>
                                                Enregistrer
                                            </Button>

                                            <Button variant="contained" color="secondary" disableElevation onClick={() => closePopUp()}>
                                                Annuler
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </Container>
                    </div>
                </div>
            }
        </div>
    );
};

export default AddRole;