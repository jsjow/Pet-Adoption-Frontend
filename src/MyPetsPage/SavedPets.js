import React, { useState, useEffect } from 'react';
import PetCards from '../Pets/PetCards';
import axios from 'axios';
import { Row } from 'reactstrap';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const SavedPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get(base_URL + `/saved-pets/${localStorage.getItem("sessionID")}`)
            .then(res => setPets(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <Row className="align-items-center mt-5 mb-2 flex-column">
                <h4 className="welcome-message mb-3">Your saved pets</h4>
            </Row>
            <PetCards account={true} pets={pets} />
        </div>
    )
}

export default SavedPets;