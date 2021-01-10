import React from "react";
import { Form, Container, Row, Label, Input, FormGroup, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from '../fetch';
import { Authentication } from '../contexts/Authentication';
import { invalidFields } from '../WebsiteResponses/WebsiteResponses';

const SignUp = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const { setAuthenticated } = useContext(Authentication);

  const switchToLogin = () => {
    props.openMe(false);
    props.other(true);
    setFirstname('');
    setLastname('');
    setConfirmPassword('');
    setPhoneNumber('');
  };

  const submitUser = () => {
    if (password === confirmPassword) {
    const userDetails = {firstname, lastname, email, password, phoneNumber, role: 'USER_STATUS', bio: '', savedPets: [], fosteringPets: []}
    Signup(userDetails, setAuthenticated);
    } else {
      invalidFields("Passwords didn't match");
    }
  };
  return (
    <Container>
      <Row className="d-flex justify-content-end">
        <Button color="danger mr-3 mt-3" onClick={() => props.openMe(false)}>
          X
        </Button>
      </Row>
      <ModalHeader className="mt-n4">Create Account</ModalHeader>
      <ModalBody>
        <Form>
          <div className="d-flex flex-row">
            <FormGroup>
              <Label for="firstName">First Name <span style={{color: "red"}}>*</span></Label>
              <Input
              required
                onChange={(event) => setFirstname(event.target.value)}
                type="text"
                name="firstName"
                id="firstname"
              />
            </FormGroup>
            <FormGroup>
              <Label className="ml-3" for="lastName">
                Last Name <span style={{color: "red"}}>*</span>
              </Label>
              <Input
              required
                className="ml-3"
                onChange={(event) => setLastname(event.target.value)}
                type="text"
                name="lastName"
                id="lastname"
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="email">Email <span style={{color: "red"}}>*</span></Label>
            <Input
            required
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              name="email"
              placeholder="example@something.com"
              id="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password <span style={{color: "red"}}>*</span></Label>
            <Input
            required
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="min 8 char, 1 special char, 1 capital letter"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password-confirm">Confirm Password <span style={{color: "red"}}>*</span></Label>
            <Input
            required
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              name="password-confirm"
              id="confirmPassword"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone-number">Phone Number <span style={{color: "red"}}>*</span></Label>
            <Input
            required
              onChange={(event) => setPhoneNumber(event.target.value)}
              type="tel"
              name="phone-number"
              id="phoneNumber"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
          <Button color="primary" disabled={(firstname.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0 && phoneNumber.length > 0) ? false : true} onClick={submitUser} color="success">
            Sign Up
          </Button>
        <Link to="/login">
          <Button color="primary" onClick={switchToLogin} color="success">
            I Already Have An Account
          </Button>
        </Link>
      </ModalFooter>
    </Container>
  );
};

export default SignUp;
