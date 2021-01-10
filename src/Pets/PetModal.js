import React, { Fragment } from 'react';
import { Row, Button, CardFooter, Modal } from 'reactstrap';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'mdbreact/dist/css/mdb.css';
import { MDBBtn } from 'mdbreact';

const PetModal = (props) => {

    return (
        <Modal style={{ maxWidth: "800px" }} isOpen={props.openMe}>
            <Row className="justify-content-end">
                <Button className="col-1 mr-5 mt-3" onClick={() => props.setOpenMe(false)} color="danger">X</Button>
            </Row>
            <Row className="justify-content-center mb-4">
                <img style={{ maxWidth: "450px", maxHeight: "400px" }} className="img-fluid mb-4 col-10 rounded" src={props.myImage} alt="Card image cap" />
                <title className="mb-4 mt-2">{props.pet.name}</title>
            </Row>
            <Row className="justify-content-center">
                <ul style={{ listStyleType: "none", backgroundColor: "lightgreen" }} className="border col-sm-8 col-11 rounded pt-3 align-items-center"><Row className="mb-4"><li className="col-4"><span className="font-weight-bold">Name:</span> {props.pet.name}</li> <li className="col-4"><span className="font-weight-bold ">Type: </span> {props.pet.type}</li><li className="col-4"><span className="font-weight-bold">Breed:</span> {props.pet.breed}</li></Row >
                    <Row className="mb-4"><li className="col-4"><span className="font-weight-bold">Adopted:</span>{props.pet.adopted}</li>
                        <li className="col-4"><span className="font-weight-bold">Gender: </span> {props.pet.gender}</li>
                        <li className="col-4"><span className="font-weight-bold">Color: </span> {props.pet.color}</li></Row>
                    <Row className="mb-4"><li className="col-4"><span className="font-weight-bold">Weight: </span> {props.pet.weight}</li>
                        <li className="col-4"><span className="font-weight-bold">Height:</span> {props.pet.height}</li>
                        <li className="col-4"><span className="font-weight-bold">Hypoallergenic:</span> {props.pet.hypoAllergenic}</li></Row>
                    <Row className="mb-4"><li className="col-6"><span className="font-weight-bold">Dietary Restrictions:</span> {props.pet.dietaryRestrictions}</li>
                        <li className="col-6"><span className="font-weight-bold">Bio: </span> {props.pet.bio}</li></Row>
                </ul>
            </Row>
            {props.account ?
                <CardFooter className="flex-row d-flex align-items-center justify-content-end">
                    <Row className="w-100">
                        {!props.adopts.includes(`${props.pet._id}`) ? <Fragment><MDBBtn className="rounded" onClick={() => props.adoptPet(props.pet)} gradient="peach">Adopt</MDBBtn></Fragment> : <Fragment><MDBBtn className="rounded" onClick={() => props.returnPet(props.pet)} gradient="peach">Return</MDBBtn></Fragment>}
                    </Row>
                    {!props.saves.includes(`${props.pet._id}`) ? <p style={{ fontSize: "18px" }} className="mr-3 mb-n1">Save</p> : <p style={{ fontSize: "18px" }} className="mr-3 mb-n1">Unsave</p>}
                    {!props.saves.includes(`${props.pet._id}`) ? <FontAwesomeIcon color="red" style={{ cursor: 'pointer' }} onClick={() => props.savePet(props.pet)} className="mr-2 awesome-icon" icon={regularHeart}></FontAwesomeIcon> : <FontAwesomeIcon color="red" style={{ cursor: 'pointer' }} onClick={() => props.unSavePet(props.pet)} className=" awesome-icon" icon={solidHeart}></FontAwesomeIcon>}
                </CardFooter>
                :
                <CardFooter />}
        </Modal>
    )
}

export default PetModal;
