import React, { useState, useEffect } from 'react';
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
import Header from '../component/Header';
import FormatDate from '../component/FormatDate';



import { DatePicker } from "@material-ui/pickers";



const Inscription = (props) => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [date, setdate] = useState(new Date());
    const [adress, setadress] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [probGlob, setProbGlob] = useState("");
    const [role, setNvRole] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [file, setFile] = useState('');
    const [localFoto, setLocalFoto] = useState('');

    const [inscri, setInscri] = useState(false);

    const [roles, setRoles] = useState([]);

    let dateNaissance = FormatDate('Thu Aug 14 1986 15:14:00 GMT+0200 (Central European Summer Time)');

    //variables de vérification
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorDate, setErrorDate] = useState("");
    const [errorAdress, setErrorAdress] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorRole, setErrorRole] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [errorPass, setErrorPass] = useState("");






    const verifForm = () => {

        let errorSend = false;

        if (firstName === "") {

            setErrorFirstName("Le champ Nom est vide !");
            errorSend = true;

        } else {
            setErrorFirstName("")
        }

        if (lastName === "") {

            setErrorLastName("Le champ Prénom est vide !");
            errorSend = true;
        } else {
            setErrorLastName("")
        }

        if (date === "") {

            setErrorDate("Le champ Date de naissance est vide !");
            errorSend = true;
        } else {
            setErrorDate("")
        }

        if (adress === "") {

            setErrorAdress("Le champ Adresse est vide !");

        } else {
            setErrorAdress("")
        }

        if (email === "") {

            setErrorEmail("Le champ Email est vide !");
            errorSend = true;
        } else {
            if (email.includes("@") === false) {
                setErrorEmail("Le champ Email est invalide !");
                errorSend = true;
            } else {
                setErrorEmail("")
            }
        }

        if (phone === "") {

            setErrorPhone("Le champ numéro de téléphone est vide !");
            errorSend = true;
        } else {
            setErrorPhone("")
        }

        if (role === "") {

            setErrorRole("Le champ Role est vide !");
            errorSend = true;
        } else {
            setErrorRole("")
        }
        if (login === "") {
            setErrorLogin("Le champ Login est vide !");
            errorSend = true;
        } else {
            setErrorLogin("")
        }

        if (pass === "") {

            setErrorPass("Le champ Mots de passe est vide !");
            errorSend = true;
        } else {
            setErrorPass("")
        }

        if (errorSend) {
            return false
        } else {
            return true;
        }
    }


    const sendInfo = () => {
        console.log("file : ",file)
        const isValid = verifForm();

        if (isValid) {

            const data = new FormData();

            data.append("firstName", firstName);
            data.append("lastName", lastName);
            data.append("date", dateNaissance);
            data.append("adress", adress);
            data.append("email", email);
            data.append("phone", phone);
            data.append("role", role);
            data.append("login", login);
            data.append("pass", pass);
            if (file) {
                data.append("file", file);
            }



            
            axios.post('http://localhost:5000/api/user/register/', data)
                .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                        //props.changeEtatListe(true);
                        setInscri(true);
                        setTimeout(function () {
                            setInscri(false);
                            setfirstName("");
                            setlastName("");
                            setdate("");
                            setadress("");
                            setemail("");
                            setphone("");
                            setLogin("");
                            setPass("");
                            setNvRole("");
                            setLocalFoto("")

                        }, 3000);

                    } else {
                        setProbGlob("Problème d'inscription, essayer une autre fois !");
                    }
                }
                );

        } else {
            console.log("error input")
        }



    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/roles/', { withCredentials: true, credentials: 'include' }
        )
            .then(response => {
                if (response.status === 200) {
                    setRoles(response.data);
                    console.log(response.data);

                } else {
                    console.log(response.data)
                }

            });
    }, [])

    const clearForm = () => {
        setfirstName("");
        setlastName("");
        setdate("");
        setadress("");
        setemail("");
        setphone("");
        setLogin("");
        setPass("");
        setNvRole("");
    }

    const handelPicture = (e) => {
        setLocalFoto(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    return (
        <div className="contAddRole">
            <Header />
            <h1>Ajout Utilisateur </h1>
            {inscri ?
                (
                    <h4>l'utilisateur est inscrit avec succée</h4>
                ) : (
                    <Container>
                        <Card>
                            <CardContent>
                                <div>{probGlob}</div>
                                <form noValidate autoComplete="off">
                                    <div className="continput100">
                                        <div className="contPhotoUser">
                                            {localFoto === '' ? (
                                                <img src="default-user-icon-profile.png" alt="" />
                                            ) : (
                                                <img src={localFoto} alt="" />
                                            )

                                            }
                                            <div className="contInputPhoto">
                                                <input type="file" name="photo" onChange={(e) => handelPicture(e)} />
                                            </div>
                                        </div>
                                        

                                    </div>
                                <div className="rightCol">
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre nom</InputLabel>
                                            <Input
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) => setfirstName(e.target.value)}
                                                name="firstName"

                                            />
                                        </FormControl>
                                        <div className="error">{errorFirstName}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre prénom</InputLabel>
                                            <Input
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => setlastName(e.target.value)}
                                                name="lastName"

                                            />
                                        </FormControl>
                                        <div className="error">{errorLastName}</div>
                                    </div>

                                    <div className="continput datepicker">

                                        <DatePicker
                                            disableFuture
                                            openTo="year"
                                            format="dd/MM/yyyy"
                                            label="Date de naissance"
                                            views={["year", "month", "date"]}
                                            value={date}
                                            onChange={setdate}
                                        />

                                        <div className="error">{errorDate}</div>

                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre adresse</InputLabel>
                                            <Input
                                                id="adress"
                                                value={adress}
                                                onChange={(e) => setadress(e.target.value)}
                                                name="adress"

                                            />
                                        </FormControl>
                                        <div className="error">{errorAdress}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre email</InputLabel>
                                            <Input
                                                id="email"
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                                name="email"

                                            />
                                        </FormControl>
                                        <div className="error">{errorEmail}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre numéro de téléphone</InputLabel>
                                            <Input
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setphone(e.target.value)}
                                                name="phone"
                                                type="number"

                                            />
                                        </FormControl>
                                        <div className="error">{errorPhone}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={role}
                                                onChange={(e) => setNvRole(e.target.value)}
                                            >
                                                {
                                                    roles.map((el, index) => (
                                                        <MenuItem key={index} value={el._id}>{el.nameGroupe}</MenuItem>
                                                        ))}

                                            </Select>
                                        </FormControl>
                                        <div className="error">{errorRole}</div>
                                    </div>

                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Login</InputLabel>
                                            <Input
                                                id="login"
                                                value={login}
                                                onChange={(e) => setLogin(e.target.value)}
                                                name="login"

                                            />
                                        </FormControl>
                                        <div className="error">{errorLogin}</div>
                                    </div>
                                    <div className="continput">
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="standard-adornment-amount">Votre mot de passe</InputLabel>
                                            <Input
                                                id="pass"
                                                value={pass}
                                                onChange={(e) => setPass(e.target.value)}
                                                name="pass"

                                            />
                                        </FormControl>
                                        <div className="error">{errorPass}</div>
                                    </div>


                                    <div className="contBttEnvoyer">
                                        <Button variant="contained" color="primary" disableElevation onClick={() => sendInfo()}>
                                            Enregistrer
                                        </Button>

                                        <Button variant="contained" color="secondary" disableElevation onClick={() => clearForm()}>
                                            Annuler
                                        </Button>
                                    </div>

                                </div>

                                </form>
                            </CardContent>

                        </Card>
                    </Container>

                )

            }


        </div>
    );
};

export default Inscription;