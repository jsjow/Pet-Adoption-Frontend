import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row } from "reactstrap";
import axios from "axios";
import { submitProfileChanges } from '../fetch';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const Profile = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [userDocument, setUserDocument] = useState('');
    const [details, setDetails] = useState({});

    useEffect(() => {
        axios.get(base_URL + `/profile/${localStorage.getItem("sessionID")}`)
            .then(res => (
                setUserDocument(res.data),
                setFirstname(res.data.firstname),
                setLastname(res.data.lastname),
                setEmail(res.data.email),
                setPassword(res.data.password),
                setPhoneNumber(res.data.phoneNumber),
                setBio(res.data.bio)
            ))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (userDocument.firstname !== firstname || userDocument.lastname !== lastname || userDocument.email !== email || password.length > 0 || userDocument.phoneNumber !== phoneNumber || userDocument.bio !== bio) {
            setIsDisabled(false);
            setDetails({ firstname, lastname, email, password, phoneNumber, bio });
        }
        else {
            setIsDisabled(true);
        }
    }, [firstname, lastname, email, password, phoneNumber, bio])

    return (
        <Container className="d-flex flex-column align-items-center rounded col-md-10 col-12 pb-5 mt-3 mb-5">
            <h1 className="mt-5 mb-4 login-title mr-4">Profile</h1>
            <Form className="col-sm-5 col-12 mt-3 ml-5">
                <Row style={{ marginLeft: "0", paddingLeft: "0" }}>
                    <FormGroup style={{ marginLeft: "0", paddingLeft: "0" }} className=" col-5">
                        <Label>First Name</Label>
                        <Input value={firstname} type="text" onChange={(e) => setFirstname(e.target.value)} />
                    </FormGroup>
                    <FormGroup style={{ marginLeft: "0", paddingLeft: "0" }} className="ml-2  col-5">
                        <Label>Last Name</Label>
                        <Input value={lastname} type="text" onChange={(e) => setLastname(e.target.value)} />
                    </FormGroup>
                </Row>
                <FormGroup style={{ marginLeft: "0", paddingLeft: "0" }} className="col-10">
                    <Label>Email</Label>
                    <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ marginLeft: "0", paddingLeft: "0" }} className="col-10">
                    <Label>Password</Label>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup style={{ marginLeft: "0", paddingLeft: "0" }} className="col-10">
                    <Label>Phone Number</Label>
                    <Input value={phoneNumber} type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Bio</Label>
                    <Input type="textarea" value={bio} type="textarea" onChange={(e) => setBio(e.target.value)} placeholder="A short description of yourself and why you joined us." />
                </FormGroup>
                <Button disabled={isDisabled} color="primary" onClick={() => submitProfileChanges(details, userDocument)}>Update</Button>
            </Form>
        </Container >
    )
}

export default Profile;