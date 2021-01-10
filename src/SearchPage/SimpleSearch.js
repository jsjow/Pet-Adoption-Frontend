import React, { useState } from 'react';
import { InputGroup, Input, InputGroupAddon, Button, Row } from 'reactstrap';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PetCards from '../Pets/PetCards';
import axios from 'axios';
import { Link } from 'react-router-dom';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const SimpleSearch = (props) => {
    const [searchedPets, setSearchedPets] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const sendSimpleSearch = async (e) => {
        setSearchValue(e.target.value); //state change isn't fast enough, setting state for button function
        return axios.get(base_URL + `/search/pet?type=${e.target.value}`)
            .then(res => setSearchedPets(res.data))
    }

    const sendSimpleSearchButton = () => {
        return axios.get(base_URL + `/search/pet?type=${searchValue}`)
            .then(res => setSearchedPets(res.data))
    }

    return (
        <div>
            <div>
                <Row className="align-items-center flex-column">
                    <InputGroup className="col-md-4 mt-5 col-10 align-items-center">
                        <Button className="mr-2" color="primary">Pet Type: </Button>
                        <Input className="cursor-pointer rounded" id="pets" type="select" onChange={sendSimpleSearch}>
                            <option value="" selected>Choose here</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                        </Input>
                        <InputGroupAddon addonType="append">
                            <Button color="success" onClick={sendSimpleSearchButton}><FontAwesomeIcon icon={faSearch} /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {props.account ? null : <Link to="/"><Button className="mt-5">Sign Up / Login</Button></Link>}
                </Row>
            </div>
            <PetCards account={props.account ? true : false} pets={searchedPets} />
        </div>
    )
}

export default SimpleSearch;