import React, { useState, useEffect } from "react";
import { Row, Button, Form, Input } from "reactstrap";
import { checkForAdmin } from '../fetch';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { petUploaded, formIssue } from '../WebsiteResponses/WebsiteResponses';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const AddPet = (props) => {
    const [adminConfirmation, setAdminConfirmation] = useState(null);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [adoptionStatus, setAdoptionStatus] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [color, setColor] = useState('');
    const [bio, setBio] = useState('');
    const [hypoAllergenic, setHypoAllergenic] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [breed, setBreed] = useState('');
    const [allBreeds, setAllBreeds] = useState([]);
    const [editState, setEditState] = useState(props.location.state);
    const history = useHistory();
    const petDocument = { type, breed, gender, name, adoptionStatus, height, weight, color, bio, hypoAllergenic, dietaryRestrictions }

    useEffect(() => {
        checkForAdmin(setAdminConfirmation, true, false);
        if (editState) {
            setType(editState.type); setBreed(editState.breed); setGender(editState.gender); setName(editState.name); setAdoptionStatus(editState.adoptionStatus); setHeight(editState.height); setWeight(editState.weight); setColor(editState.color); setBio(editState.bio); setHypoAllergenic(editState.hypoAllergenic); setDietaryRestrictions(editState.dietaryRestrictions);
        }
        axios.get("https://dog.ceo/api/breeds/list/all")
            .then(res => setAllBreeds(Object.keys(res.data.message)))
            .catch(err => console.log(err));
    }, [])

    const formCheck = () => {
        for (let i of Object.values(petDocument)) {
            if (i.length < 1) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    const appendFormData = () => {
        const petArray = Object.entries(petDocument);
        const data = new FormData();
        for (let i = 0; i < petArray.length; i++) {
            data.append(`${petArray[i][0]}`, petArray[i][1])
        }
        data.append('file', file);
        return data;
    }

    const redirectToHome = () => {
        setTimeout(() => {
            history.push('/home')
        }, 3000)
    }

    const setImage = (e) => {
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const uploadPet = (e) => {
        e.preventDefault();
        if (!formCheck()) {
            return formIssue("Form must be completed");
        }
        axios.post(base_URL + '/upload', appendFormData())
            .then(res => petUploaded("Pet uploaded"), redirectToHome()).catch(err => formIssue("Couldn't upload pet"));
    }

    const editPet = (e, id) => {
        e.preventDefault();
        console.log(petDocument)
        if (!formCheck()) {
            return formIssue("Form must be completed");
        }
        axios.put(base_URL + '/edit-pet/${id}', appendFormData())
            .then(res => petUploaded("Pet edited"), redirectToHome()).catch(err => formIssue("Couldn't edit pet"));
    }

    return (
        <div>
            {adminConfirmation ?
                <Form className="mb-5" method="post" name="pet" enctype="multipart/form-data">
                    <Row>
                        <Input type="file" className="mt-5 file-input" onChange={setImage}></Input>
                    </Row>
                    <Row className="justify-content-center">
                        <img className="admin-img mt-4 ml-3 rounded" style={{ width: "400px", height: "260px" }} src={file != null || editState == null ? fileUrl : editState.image}></img>
                    </Row>
                    <Row className="justify-content-center">
                        <ul style={{ listStyleType: "none" }} className="col-sm-6 col-10">
                            <Row>
                                <li className="mt-3 col-6">Type:
                        <Input className="mt-2" id="pets" value={type} type="select" onChange={(e) => setType(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>
                                        <option value="Bird">Bird</option>
                                    </Input>
                                </li>
                                <li className="mt-3 col-6">Breed:
                        <Input type="select" className="mt-2" value={breed} onChange={(e) => setBreed(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        {allBreeds.map((breed) => {
                                            const capBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
                                            return <option value={`${capBreed}`}>{capBreed}</option>
                                        })}
                                    </Input>
                                </li>
                            </Row>
                            <Row>
                                <li className="mt-3 col-12">Gender:
                            <Input type="select" className="mt-2" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Input>
                                </li>
                                <li className="mt-3 w-25 col-12">Name:
                        <Input type="text" className="mt-2" value={name} onChange={(e) => setName(e.target.value)} />
                                </li>
                            </Row>
                            <Row>
                                <li className="mt-3 w-25 col-6">Adopted:
                        <Input className="mt-2" id="pets" type="select" value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Input>
                                </li>
                                <li className="mt-3 w-25 col-6">Color:<Input type="text" value={color} className="mt-2" onChange={(e) => setColor(e.target.value)} /></li>
                            </Row>
                            <Row>
                                <li className="mt-3 w-25 col-6">Weight:
                        <Input id="pets" type="select" className="mt-2" value={weight} onChange={(e) => setWeight(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        <option value="4kg - 10kg">4kg - 10kg</option>
                                        <option value="10kg - 18kg">10kg - 18kg</option>
                                        <option value="18kg - 24kg">18kg - 24kg</option>
                                        <option value="24kg - 40kg">24kg - 40kg</option>
                                    </Input>
                                </li>
                                <li className="mt-3 w-25 col-6">Height:
                        <Input className="mt-2" id="pets" type="select" value={height} onChange={(e) => setHeight(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        <option value="0.5m - 0.8m">0.5m - 0.8m</option>
                                        <option value="0.8m - 1.2m">0.8m - 1.2m</option>
                                        <option value="1.2m - 1.6m">1.2m - 1.6m</option>
                                    </Input>
                                </li>
                            </Row>
                            <Row>
                                <li className="mt-3 col-12">Bio:<Input type="textarea" value={bio} className="mt-2" onChange={(e) => setBio(e.target.value)} /></li>
                            </Row>
                            <Row>
                                <li className="mt-3 w-25 col-4">Hypoallergenic:
                                <Input id="pets" type="select" className="mt-2" value={hypoAllergenic} onChange={(e) => setHypoAllergenic(e.target.value)}>
                                        {editState ? null : <option value="" selected>Choose here</option>}
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Input>
                                </li>
                                <li className="mt-3 w-25 col-8">Dietary restrictions:<Input type="text" value={dietaryRestrictions} className="mt-2" onChange={(e) => setDietaryRestrictions(e.target.value)} /></li>
                            </Row>
                        </ul>
                    </Row>
                    <Row className="justify-content-center">
                        {editState != null ? <Button onClick={(e) => editPet(e, editState._id)}>Edit</Button> : <Button onClick={(e) => uploadPet(e)} type="submit" color="primary" className="mt-3">Upload Pet</Button>}
                    </Row>
                </Form>
                : <h1>Not Allowed</h1>}
        </div>)
}

export default AddPet;