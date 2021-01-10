import React, { useEffect, useState } from "react";
import { Row, Button } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { docDeleted } from '../WebsiteResponses/WebsiteResponses';
import { checkForAdmin } from '../fetch';
const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const AdminDashBoard = (props) => {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [adminConfirmation, setAdminConfirmation] = useState(false);

    useEffect(() => {
        checkForAdmin(setAdminConfirmation, true, false);
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: "Bearer " + token } }
        axios.get(base_URL + '/admindashboard', config)
            .then(res => (setUsers(res.data.users), setPets(res.data.pets)))
            .catch(err => console.log("There was an issue fetching the information"))
    }, [])

    const deleteUser = (id) => {
        docDeleted("User deleted");
        axios.delete(base_URL +  `/delete-user/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const deletePet = (id, user) => {
        docDeleted("Pet deleted");
        console.log(user)
        axios.delete(base_URL + `/delete-pet/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setTimeout(() => window.location.reload(), 1500)
    }

    return (
        <div>
            {adminConfirmation ? <div>
            <Row className="align-items-center mt-5 mb-2 flex-column">
                <h4 className="welcome-message mb-4">Dashboard</h4>
            </Row>
            <Row style={{backgroundColor: "white"}} style={{ fontSize: "18px" }} className="border justify-content-center">
                <ul className="mt-3 col-sm-7 col-10"> {<h4>Users</h4>}
                    {users.map((user) => {
                        return (
                            <li style={{ listStyle: "none", backgroundColor: "lightgreen", height: "fit-content", padding: "10px" }} className="mt-5 border rounded"><ul className="overflow-hidden"><li className="mb-1"><span className="font-weight-bold">First Name:</span> {user.firstname}</li> <li className="mb-1"><span className="font-weight-bold">Last Name:</span> {user.lastname}</li><li className="mb-1"><span className="font-weight-bold">Email:</span> {user.email}</li>
                                <li ><span className="font-weight-bold">Phone Number: </span>{user.phoneNumber}</li><li className="mb-1"><span className="font-weight-bold">Fostering:</span> {user.fosteringPets.map((pet) => {
                                    return pet + ', ';
                                })}
                                </li>
                                <li className="mb-1"><span><span className="font-weight-bold">Bio:</span> {user.bio}</span></li>
                                <li><Button onClick={() => deleteUser(user._id, user._id)} >Delete User</Button></li>
                            </ul>
                            </li>
                        )
                    })}
                </ul>
            </Row>
            <Row style={{backgroundColor: "white"}} style={{fontSize: "18px" }} className="border justify-content-center">
                <ul className="mt-3 col-sm-7 col-10"> {<h4>Pets</h4>}
                    {pets.map((pet) => {
                        return (
                            <li style={{ listStyle: "none", backgroundColor: "#82D1F5", height: "fit-content", padding: "10px" }} className="mt-5 border rounded"><ul className="overflow-hidden"><li className="mb-1"><span className="font-weight-bold">Pet Name:</span> {pet.name}</li> <li className="mb-1"><span className="font-weight-bold ">Type: </span> {pet.type}</li><li className="mb-1"><span className="font-weight-bold">Breed:</span> {pet.breed}</li>
                                <li className="mb-1"><span className="font-weight-bold">Adopted:</span>{pet.adopted}</li><li ><span className="font-weight-bold">Gender: </span> {pet.gender}</li>
                                <li className="mb-1"><span className="font-weight-bold">Color: </span> {pet.color}</li>
                                <li className="mb-1"><span className="font-weight-bold">Weight: </span> {pet.weight}</li>
                                <li className="mb-1"><span className="font-weight-bold">Height:</span> {pet.height}</li>
                                <li className="mb-1"><span className="font-weight-bold">Hypoallergenic:</span> {pet.hypoAllergenic}</li>
                                <li className="mb-1"><span className="font-weight-bold">Dietary Restrictions:</span> {pet.dietaryRestrictions}</li>
                                <li className="mb-1"><span className="font-weight-bold">Image: </span><a href={pet.image} target="_blank"> {pet.image.toString()}</a></li>
                                <li className="mb-1"><span className="font-weight-bold">Bio: </span> {pet.bio}</li>
                                <li className="mb-1"><span className="font-weight-bold">Pet ID: </span> {pet._id}</li>
                                <li>
                                    <div>
                                        <Link to={{ pathname: "/admin/upload", state: pet }} pet={pet} ><Button onClick={() => setModalOpen(true)} >Edit Pet</Button></Link>
                                        <Button onClick={() => deletePet(pet._id)} >Delete Pet</Button>
                                    </div>
                                </li>
                            </ul>
                            </li>
                        )
                    })}
                </ul>
            </Row>
            </div>: <h1>Not allowed</h1>}
        </div>
    )
}

export default AdminDashBoard;