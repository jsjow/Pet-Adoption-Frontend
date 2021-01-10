import React, { useState } from 'react';
import { InputGroup, Row, Button, Input, Label } from 'reactstrap';
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
            <form className='mt-5 justify-content-center'>
                <div className="justify-content-center d-flex">
                    <Row className="col-8 align-items-center">
                        <InputGroup className="col-5 align-items-center">
                            <Label className="mr-3 cursor-pointer">Pet Type: </Label>
                            <Input id="pets" type="select" onChange={(e) => setAdvancedType(e.target.value)}>
                                <option value="" selected>Choose here</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                            </Input>
                        </InputGroup>
                        <InputGroup className="col-5">
                            <Label className="mr-3 cursor-pointer">Adopted: </Label>
                            <Input className="" id="pets" type="select" onChange={(e) => setAdvancedAdoption(e.target.value)}>
                                <option value="" selected>Choose here</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </Input>
                        </InputGroup>
                    </Row>
                </div>
                <div className="justify-content-center d-flex mt-5">
                    <Row className="col-8 align-items-center">
                        <InputGroup className="align-items-center">
                            <Label className="mr-3 cursor-pointer">Weight: </Label>
                            <Input id="pets" type="select" onChange={(e) => setAdvancedWeight(e.target.value)}>
                                <option value="" selected>Choose here</option>
                                <option value="4kg - 10kg">4kg - 10kg</option>
                                <option value="10kg - 18kg">10kg - 18kg</option>
                                <option value="18kg - 24kg">18kg - 24kg</option>
                                <option value="24kg - 40kg">24kg - 40kg</option>
                            </Input>
                            <Label className="mr-3 ml-3 cursor-pointer">Height: </Label>
                            <Input className="" id="pets" type="select" onChange={(e) => setAdvancedHeight(e.target.value)}>
                                <option value="" selected>Choose here</option>
                                <option value="0.5m - 0.8m">0.5m - 0.8m</option>
                                <option value="0.8m - 1.2m">0.8m - 1.2m</option>
                                <option value="1.2m - 1.6m">1.2m - 1.6m</option>
                            </Input>
                            <Label className="mr-3 ml-3 cursor-pointer">Name: </Label>
                            <Input id="pets" type="text" onChange={(e) => setAdvancedName(e.target.value)} />
                        </InputGroup>
                    </Row>
                </div>
                <Row className="align-items-center flex-column">
                    <Button onClick={sendAdvancedSearch} color="primary" className="col-md-1 col-3 mt-5"><FontAwesomeIcon icon={faSearch} /></Button>
                </Row>
            </form>
            <PetCards account={true} pets={searchedPets} />
        </div>
    )
}

export default AdvancedSearch;