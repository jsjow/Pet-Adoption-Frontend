import React, { useState } from 'react';
import { InputGroup, Row, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PetCards from '../Pets/PetCards';
import axios from 'axios';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const AdvancedSearch = () => {
    const [advancedType, setAdvancedType] = useState('');
    const [advancedAdoption, setAdvancedAdoption] = useState('');
    const [advancedWeight, setAdvancedWeight] = useState('');
    const [advancedHeight, setAdvancedHeight] = useState('');
    const [advancedName, setAdvancedName] = useState('');
    const [searchedPets, setSearchedPets] = useState([]);

    const sendAdvancedSearch = () => {
        axios.get(base_URL + `/advanced-search/pet?type=${advancedType}&adopted=${advancedAdoption}&weight=${advancedWeight}&height=${advancedHeight}&name=${advancedName}`)
            .then(res => setSearchedPets(res.data))
    }

    return (
        <div>
            <Form className='mt-4'>
                <Row className="mb-3">
                    <Row className="col-4 offset-2 align-items-center">
                        <Label>Pet Type: </Label>
                        <Input className="mb-2" id="pets" type="select" onChange={(e) => setAdvancedType(e.target.value)}>
                            <option value="" selected>Choose here</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                        </Input>
                        <Label>Adopted: </Label>
                        <Input id="pets" type="select" onChange={(e) => setAdvancedAdoption(e.target.value)}>
                            <option value="" selected>Choose here</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </Input>
                    </Row>
                    <Row className="col-4 align-items-center ml-4">
                        <Label>Weight: </Label>
                        <Input className="mb-2" id="pets" type="select" onChange={(e) => setAdvancedWeight(e.target.value)}>
                            <option value="" selected>Choose here</option>
                            <option value="4kg - 10kg">4kg - 10kg</option>
                            <option value="10kg - 18kg">10kg - 18kg</option>
                            <option value="18kg - 24kg">18kg - 24kg</option>
                            <option value="24kg - 40kg">24kg - 40kg</option>
                        </Input>
                        <Label>Height: </Label>
                        <Input id="pets" type="select" onChange={(e) => setAdvancedHeight(e.target.value)}>
                            <option value="" selected>Choose here</option>
                            <option value="0.5m - 0.8m">0.5m - 0.8m</option>
                            <option value="0.8m - 1.2m">0.8m - 1.2m</option>
                            <option value="1.2m - 1.6m">1.2m - 1.6m</option>
                        </Input>
                    </Row>
                </Row>
                <Row className="col-4 offset-4">
                    <Label className="cursor-pointer">Name: </Label>
                    <Input id="pets" type="text" onChange={(e) => setAdvancedName(e.target.value)} />
                </Row>
                <Row className="align-items-center flex-column">
                    <Button onClick={sendAdvancedSearch} color="primary" className="col-md-1 col-3 mt-5"><FontAwesomeIcon icon={faSearch} /></Button>
                </Row>
            </Form>
            <PetCards account={true} pets={searchedPets} />
        </div>
    )
}

export default AdvancedSearch;