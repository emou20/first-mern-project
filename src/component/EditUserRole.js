import React,{ useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const EditUserRole = (props) => {
    const [show, setShow] = useState(false);
    const [roleTxt, setRoleTxt] = useState("");
    const [nvRole, setNvRole] = useState('');
    const [probGlob, setProbGlob] = useState("");
    const [roles, setRoles] = useState([]);

    const showFormEdit = () => {
        setShow(true);
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/roles/'
        })
            .then(response => {
                if (response.status === 200) {
                    setRoles(response.data);
                    console.log(response.data)
                } else {
                    console.log(response.data)
                }

            });
    
    }
    const closePopUp = () => {
        setShow(false);
    }
    const updateInfo = () => {
        axios.put(`http://localhost:5000/api/user/role/${props.idUser}`, {nvRole})
        .then(response => {
            if(response.status === 200){
                console.log(response.data);
                setShow(false);
                props.changeEtatEdit(true);
            } else{
                setProbGlob("Problème d'inscription, essayer une autre fois !");
                console.log(response.data, response.status);
            }
        });
    }
    const handleChange = (event) => {
        setNvRole(event.target.value.toString());
    };
    useEffect(()=>{
        const coefition = props.role;
        axios.post('http://localhost:5000/api/roles/nameRole/', {coefition})
            .then(response => {
                if (response.status === 200) {
                    setRoleTxt(response.data[0].nameGroupe);
                } else {
                    console.log(response.data);
                }
            }
            );
       
    });

    return (
        <div className="contEditRole">
            <button className="bttRole" onClick={() => showFormEdit()}>{roleTxt}</button>
            {show &&
            <div className="backBlack">
                <div className="contPoupFormEdit">
                    <Container>
                        <h3>Modification du role  {roleTxt}</h3>
                            <Card>
                                <CardContent>
                                    <div>{probGlob}</div>
                                    <form noValidate autoComplete="off">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Role</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={nvRole}
                                                onChange={handleChange}
                                                >
                                                {
                                                roles.map((el, index) => (
                                                    <MenuItem key={index} value={el.coefition}>{el.nameGroupe}</MenuItem>
                                                ))}
                                                
                                                </Select>
                                        </FormControl>
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

export default EditUserRole;