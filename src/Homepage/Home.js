import React, { Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { MDBBtn } from 'mdbreact';
import PetCards from '../Pets/PetCards';
import axios from 'axios';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get(base_URL + '/home/pets')
        .then(res => setPets(res.data))
        .catch(err => console.log(err));
}, [])

  return (
    <div>
      <Row className="align-items-center mt-5 mb-2 flex-column">
        <h4 className="welcome-message mb-5">Hi {localStorage.getItem("firstname")} !</h4>
        <Fragment><MDBBtn className="col-md-2 col-6" rounded color="success">Good to have you here</MDBBtn></Fragment>
      </Row>
      <PetCards account={true} pets={pets}/>
    </div>
  );
};

export default Home;
