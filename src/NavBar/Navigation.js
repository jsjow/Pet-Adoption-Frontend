import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Row } from "reactstrap";
import "../App.css";
import { faHome, faUser, faPaw, faSignOutAlt, faSearch, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Authentication } from "../contexts/Authentication";
import { checkForAdmin } from "../fetch";

const Navigation = () => {
  const { setAuthenticated } = useContext(Authentication);
  const [adminConfirmation, setAdminConfirmation] = useState(false);

  useEffect(() => {
    checkForAdmin(setAdminConfirmation, true, false);
  }, [])

  const logOut = () => {
    setAuthenticated(false);
    localStorage.clear();
  }

  return (
    <div>
      <Row className="justify-content-center mt-3">
        <Navbar style={{backgroundColor: 'white'}} className="flex-row justify-content-between navybar rounded col-sm-9 col-10 ">
          <li className="rounded-circle navbar-logos pl-1 pr-1">
            <div style={{ cursor: 'pointer' }} class="dropdown text-decoration-none nav-list text-dark">
              <FontAwesomeIcon className="navbar-logos" icon={faHome} />
              <div class="dropdown-content rounded">
                <Link to="/home" className="dropdown-item rounded">Home</Link>
              </div>
            </div>
          </li>
          <li className="rounded-circle navbar-logos pr-1 pl-1">
            <div style={{ cursor: 'pointer' }} class="dropdown text-decoration-none nav-list text-dark">
              <FontAwesomeIcon icon={faPaw} />
              <div class="dropdown-content rounded">
                <Link to="/savedpets" className="dropdown-item rounded">Saved Pets</Link>
                <br />
                <Link to="/mypets" className="dropdown-item rounded">My Pets</Link>
              </div>
            </div>
          </li>
          <li className="rounded-circle navbar-logos pl-1 pr-1">
            <div style={{ cursor: 'pointer', right: "0;" }} class="dropdown float-right text-decoration-none nav-list text-dark">
              <FontAwesomeIcon icon={faSearch} />
              <div class="dropdown-content rounded">
                <Link to="/search" className="dropdown-item rounded">Search Pets</Link>
                <br />
                <Link to="/advanced-search" className="dropdown-item rounded">Advanced Search</Link>
              </div>
            </div>
          </li>
          <li className="rounded-circle navbar-logos pl-1 pr-1">
            <div style={{ cursor: 'pointer' }} class="dropdown text-decoration-none nav-list text-dark">
              <FontAwesomeIcon icon={faUser} />
              <div class="dropdown-content rounded">
                <Link to="/profile" className="dropdown-item rounded">Profile</Link>
              </div>
            </div>
          </li>
          {adminConfirmation ? <li className="rounded-circle navbar-logos pl-1 pr-1">
            <div style={{ cursor: 'pointer' }} class="dropdown text-decoration-none nav-list text-dark">
              <FontAwesomeIcon icon={faLock} />
              <div class="dropdown-content rounded">
                <Link to="/admin/dashboard" className="dropdown-item rounded">Dashboard</Link>
                <br />
                <Link to="/admin/upload" className="dropdown-item rounded">Add a pet</Link>
              </div>
            </div>
          </li> : null}
          <li className="rounded-circle navbar-logos pl-1 pr-1">
            <div style={{ cursor: 'pointer' }} class="dropdown text-decoration-none nav-list text-dark">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <div class="dropdown-content rounded">
                <Link to="/" onClick={logOut} className="dropdown-item rounded">Log Out</Link>
              </div>
            </div>
          </li>
        </Navbar>
      </Row>
    </div>
  );
};

export default Navigation;
