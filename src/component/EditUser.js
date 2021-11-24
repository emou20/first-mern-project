import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Header from "./Header";

const EditUser = (props) => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [date, setdate] = useState("");
    const [adress, setadress] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [probGlob, setProbGlob] = useState("");

    const [file, setFile] = useState('');
    const [localFoto, setLocalFoto] = useState('');
    const [fotoCarger, setFotoCarger] = useState(false);


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/user/${props.match.params.idUser}`
        })
            .then(response => {
                if (response.status === 200) {
                    setfirstName(response.data.firstName);
                    setlastName(response.data.lastName);
                    setdate(response.data.date);
                    setadress(response.data.adress);
                    setemail(response.data.email);
                    setphone(response.data.phone);
                    setLocalFoto(response.data.foto)

                } else {
                    console.log(response.data)
                }

            });

    }, []);

    const updateInfo = () => {

        const data = new FormData();

            data.append("firstName", firstName);
            data.append("lastName", lastName);
            data.append("date", date);
            data.append("adress", adress);
            data.append("email", email);
            data.append("phone", phone);

        if (file){
            data.append("file", file);    
        }else {
            data.append("file", localFoto);
        }

        axios.put(`http://localhost:5000/api/user/${props.match.params.idUser}`, data)
            .then(response => {
                console.log(response.status);
                if (response.status !== 500) {
                    console.log("ok")
                } else {
                    setProbGlob("Problème d'inscription, essayer une autre fois !");
                    console.log(response.data);
                }
            });
    }

    const handelPicture = (e) => {
        setLocalFoto(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setFotoCarger(true)
    }

    return (
        <div className="contEditUser">
            <Header />


            <Container>
                <h3>Modification de l'utilisateur {firstName} {lastName}</h3>
                <Card>
                    <CardContent>

                        <div>{probGlob}</div>
                        <form noValidate autoComplete="off">
                            <div className="continput100">
                                <div className="contPhotoUser">
                                    {localFoto === '' || localFoto === undefined ? (
                                        <img src="../default-user-icon-profile.png" alt="" />
                                    ) : (
                                        fotoCarger ? <img src={localFoto} alt="" /> : <img src={`${process.env.REACT_APP_API_URL}/upload/${localFoto}`} alt="" />  
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
                                </div>

                                <div className="continput">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Votre date de naissance</InputLabel>
                                        <Input
                                            id="date"
                                            value={date}
                                            onChange={(e) => setdate(e.target.value)}
                                            name="date"

                                        />
                                    </FormControl>
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
                                </div>
                                <div className="continput">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="standard-adornment-amount">Votre numéro de téléphone</InputLabel>
                                        <Input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setphone(e.target.value)}
                                            name="phone"

                                        />
                                    </FormControl>
                                </div>

                                <div className="contBttEnvoyer">
                                    <Button variant="contained" color="primary" className="validBtt" disableElevation onClick={() => updateInfo()}>
                                        Enregistrer
                                    </Button>

                                    <Button variant="contained" color="secondary" disableElevation>
                                        Annuler
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </CardContent>

                </Card>
            </Container>




        </div>
    );
};

export default EditUser;