import React, { useEffect, useState } from 'react';
import "./App.css";
import LoginPage from "./Loginpage/LoginPage";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Homepage/Home";
import Navigation from "./NavBar/Navigation";
import Profile from './Profilepage/Profile';
import { Authentication } from "./contexts/Authentication";
import { getCookies } from './fetch';
import AddPet from "./Admin/AddPet";
import SimpleSearch from './SearchPage/SimpleSearch';
import MyPets from './MyPetsPage/MyPets';
import SavedPets from './MyPetsPage/SavedPets';
import AdvancedSearch from './SearchPage/AdvancedSearch';
import AdminDashBoard from './Admin/AdminDashboard';
import { checkForAdmin } from './fetch';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminConfirmation, setAdminConfirmation] = useState(false);

  useEffect(() => {
    getCookies(setAuthenticated);
    checkForAdmin(setAdminConfirmation, true, false);
  }, [])

  return (
    <Container style={{ margin: "0", padding: '0' }} fluid>
      <Authentication.Provider value={{ authenticated, setAuthenticated }}>
        {!authenticated ? (
          <Router>
            <Switch>
              <Route path="/guest/search">
                <SimpleSearch account={false} />
              </Route>
              <Route path="/" component={LoginPage} />
            </Switch>
          </Router>
        ) : (
            <Router>
              <div className="p-3 pt-4 login-title bg-white rounded flex-column text-center">
                <h3 className="font-weight-bold">Buddy &amp; Me</h3>
              </div>
              <Navigation isAdmin={adminConfirmation} />
              <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/search">
                  <SimpleSearch account={true} />
                </Route>
                <Route path="/advanced-search" component={AdvancedSearch} />
                <Route path="/savedpets" component={SavedPets} />
                <Route path="/mypets" component={MyPets} />
                <Route exact path="/admin/upload" component={AddPet} />
                <Route exact path="/admin/dashboard" component={AdminDashBoard} />
                <Route path="/" component={Home} />
                {/* <Route path="/" component={ForbiddenPage} /> */}
              </Switch>
            </Router>
          )}
      </Authentication.Provider>
    </Container>
  );
};

export default App;