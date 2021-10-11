import React, {useState} from 'react';
import { FaUserEdit } from "react-icons/fa";
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

const EditRole = (props) => {

    const [show, setShow] = useState(false);
    const [nameGroupe, setNameGroupe] = useState('');
    const [coefition, setCoefition] = useState('');
    const [probGlob, setProbGlob] = useState("");

    const showFormEdit = () => {
        setShow(true);
        axios({
            method: 'get',
            url: `http://localhost:5000/api/roles/${props.idRole}`
        })
            .then(response => {
                if (response.status === 200) {
                    setNameGroupe(response.data.nameGroupe);
                    setCoefition(response.data.coefition);
                } else {
                    console.log(response.data)
                }

            });
    
    }
    const closePopUp = () => {
        setShow(false);
    }
    const updateInfo = () => {
        axios.put(`http://localhost:5000/api/roles/update/${props.idRole}`, {nameGroupe, coefition})
        .then(response => {
            if(response.status === 200){
                setShow(false);
                props.changeEtatEdit(true);
            } else{
                setProbGlob("Problème d'inscription, essayer une autre fois !");
            }
        });
    }

    return (
        <div className="contEditUser">
            <button className="bttIcone" onClick={() => showFormEdit()}><FaUserEdit /></button>
            {show &&
            <div className="backBlack">
                <div className="contPoupFormEdit">
                    <Container>
                        <h3>Modification du role </h3>
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
                                            <Button variant="contained" color="primary" className="validBtt" disableElevation onClick={() => updateInfo()}>
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

export default EditRole;