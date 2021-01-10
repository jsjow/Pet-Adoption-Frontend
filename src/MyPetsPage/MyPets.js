import React, { useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import axios from 'axios';
import PetCards from '../Pets/PetCards';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const MyPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get(base_URL + `/adopted-pets/${localStorage.getItem("sessionID")}`)
            .then(res => setPets(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <Row className="align-items-center mt-5 mb-2 flex-column">
                <h4 className="welcome-message mb-3">{pets.length > 0 ? "I'm fostering..." : "You currently are fostering no pets"}</h4>
            </Row>
            <PetCards account={true} pets={pets} />
        </div>
    )
}

export default MyPets;