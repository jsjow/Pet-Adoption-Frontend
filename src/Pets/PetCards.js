import React, { Fragment, useEffect, useState } from 'react';
import { Row, Container, CardBody, CardTitle, CardText, Card, CardImg, CardFooter } from 'reactstrap';
import axios from 'axios';
import PetModal from './PetModal';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'mdbreact/dist/css/mdb.css';
import { MDBBtn } from 'mdbreact';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const PetCards = (props) => {
    const [currentPet, setCurrentPet] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [savedArray, setSavedArray] = useState([]);
    const [adoptedArray, setAdoptedArray] = useState([]);

    useEffect(() => {
        if (props.account) { 
        axios.get(base_URL + `/home/${localStorage.getItem("sessionID").toString()}/saves`)
            .then(res => setSavedArray(res.data.savedPets))
            .catch(err => console.log(err))
        }
    }, [props.account])

    useEffect(() => {
        if (props.account) { 
        axios.get(base_URL + `/home/${localStorage.getItem("sessionID").toString()}/adopts`)
            .then(res => setAdoptedArray(res.data.fosteringPets))
            .catch(err => console.log(err))
        }
    }, [props.account])

    const selectedPet = (pet) => {
        setCurrentPet(pet);
        setModalOpen(true);
    }

    const savePet = (pet) => {
        if (props.account) { 
        axios.put(base_URL + `/home/${localStorage.getItem("sessionID").toString()}/saved/${pet._id}`)
            .then(res => setSavedArray(res.data.savedPets))
            .catch(err => console.log(err));
        }
    }

    const unSavePet = (pet) => {
        if (props.account) { 
        axios.delete(base_URL + `/home/${localStorage.getItem("sessionID").toString()}/saved/${pet._id}`)
            .then(res => setSavedArray(res.data.savedPets))
            .catch(err => console.log(err));
        }
    }

    const adoptPet = (pet) => {
        if (props.account === true) { 
        axios.put(base_URL + `/home/${localStorage.getItem("sessionID").toString()}/adopts/${pet._id}`)
            .then(res => setAdoptedArray(res.data.fosteringPets))
            .catch(err => console.log(err));
        }
    }

    const returnPet = (pet) => {
        if (props.account === true) { 
        axios.delete(base_URL + `/home/${localStorage.getItem("sessionID").toString()}/adopts/${pet._id}`)
            .then(res => setAdoptedArray(res.data.fosteringPets))
            .catch(err => console.log(err));
        }
    }

    return (
        <Container className="images-container justify-content-center col-md-12 mt-3 pt-3 mb-5">
            <Row className="justify-content-center">
                {props.pets.map((pet) => {
                    return (
                        <Card id={pet._id} key={pet._id} className="border col-lg-3 col-10 p-2 mr-4 ml-4 mt-4 mb-1 pet-cards">
                            <CardImg style={{ cursor: "pointer", maxWidth: "100%" }} alt="Pet" onClick={() => selectedPet(pet)} className="rounded image-gallery" src={(pet.image)} />
                            <CardBody style={{ cursor: "pointer" }} onClick={() => selectedPet(pet)}>
                                <CardTitle tag="h5" className="mb-4 mt-2">{pet.name}</CardTitle>
                                <CardText><span className="font-weight-bold">Breed:</span> {pet.breed}</CardText>
                            </CardBody>
                            {props.account ?
                                <CardFooter className="flex-row d-flex align-items-center justify-content-end">
                                    <Row className="w-100">
                                        {!adoptedArray.includes(`${pet._id}`) ? <Fragment><MDBBtn className="rounded" onClick={() => adoptPet(pet)} gradient="peach">Adopt</MDBBtn></Fragment> : <Fragment><MDBBtn className="rounded" onClick={() => returnPet(pet)} gradient="peach">Return</MDBBtn></Fragment>}
                                    </Row>
                                    {!savedArray.includes(`${pet._id}`) ? <p style={{ fontSize: "18px" }} className="mr-2 mb-n1">Save</p> : <p style={{ fontSize: "18px" }} className="mr-2 mb-n1">Unsave</p>}
                                    {!savedArray.includes(`${pet._id}`) ? <FontAwesomeIcon color="red" style={{ cursor: "pointer" }} onClick={() => savePet(pet)} className="mr-2 awesome-icon" icon={regularHeart}></FontAwesomeIcon> : <FontAwesomeIcon style={{ cursor: "pointer" }} color="red" onClick={() => unSavePet(pet)} className=" awesome-icon" icon={solidHeart}></FontAwesomeIcon>}
                                </CardFooter>
                                :
                                null}
                        </Card>
                    )
                })}
            </Row>
            <PetModal account={props.account} savePet={props.account ? (content) => savePet(content) : null} unSavePet={props.account ? (content) => unSavePet(content) : null} saves={props.account ? savedArray : null} adoptPet={props.account ? (content) => adoptPet(content) : null} returnPet={props.account ? (content) => returnPet(content) : null} adopts={props.account ? adoptedArray : null} pet={currentPet} myImage={currentPet.image} openMe={modalOpen} setOpenMe={(bool) => setModalOpen(bool)} />
        </Container>
    )
}

export default PetCards;