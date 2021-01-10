import React from "react";
import { Button, Modal, Container } from "reactstrap";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { Row } from "reactstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const LoginPage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <div className="login-height">
      <Row className="d-flex justify-content-center">
        <div className="mt-5 buddy-header login-title p-4 bg-white rounded flex-column text-center">
          <h2 className="font-weight-bold">Buddy &amp; Me </h2>
          <h4 className="login-title bg-white rounded">
            Your Favorite Place To Adopt
          </h4>
        </div>
      </Row>
      <Router>
        <Container className="d-flex justify-content-center">
          <Row className="align-items-center mt-5">
            <Link to="/login">
              <Button
                className="mr-5 mt-3"
                onClick={() => setOpenLogin(true)}
                color="primary"
              >
                Login
              </Button>
            </Link>
            <h2 className="d-block mt-3 text-dark">|</h2>
            <Link to="/signup">
              <Button
                className="ml-5 mt-3"
                onClick={() => setOpenSignUp(true)}
                color="primary"
              >
                Sign Up
              </Button>
            </Link>
          </Row>
          <Switch>
            <Route path="/login">
              <Modal className="login-modal" isOpen={openLogin}>
                <Login
                  login={openLogin}
                  openMe={(pass) => setOpenLogin(pass)}
                  other={(pass) => setOpenSignUp(pass)}
                />
              </Modal>
            </Route>
            <Route path="/signup">
              <Modal className="signup-modal" isOpen={openSignUp}>
                <SignUp
                  signup={openSignUp}
                  openMe={(pass) => setOpenSignUp(pass)}
                  other={(pass) => setOpenLogin(pass)}
                />
              </Modal>
            </Route>
          </Switch>
        </Container>
      </Router>
      <div className="offset-sm-4 flex-column align-items-center col-sm-4 text-center login-bottom">
        <Link to="/guest/search">
          <Button color="success mb-5 w-50">
            Search Pets
        </Button>
        </Link>
        <h3 className="mt-1 mb-4">A Buddy Needs You.</h3>
        <p>
          We are your favorite pet adoption platform 🐶. Because our little
          buddies are unable to reach out to you, we believe we should do it in
          their stead. Join our community of guardians and we'll give you so
          much more.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
