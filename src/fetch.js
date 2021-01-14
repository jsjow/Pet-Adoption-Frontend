const axios = require('axios');

const { invalidFields, wrongCredentials, signUpSucces, signInSuccess, updatedProfile } = require('./WebsiteResponses/WebsiteResponses');

const base_URL = "https://pet-adoption-heroku-react.herokuapp.com";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  return re.test(password);
}

const checkFields = (userDetails) => {
  const { firstname, lastname, email, password, phoneNumber } = userDetails;
  if (firstname.length <= 2 || lastname.length <= 2) {
    return invalidFields('First and last name should contain at least 2 characters');
  }
  if (!validateEmail(email)) {
    return invalidFields("Please use a valid email address");
  }
  if (!validatePassword(password)) {
    return invalidFields("Your password must have a minimum of 8 characters including at least one number")
  }
  if (phoneNumber.length < 10) {
    return invalidFields("Please enter a valid phone number")
  }
  return true;
}

const Signup = (userDetails, setAuthenticated) => {
  if (checkFields(userDetails) === true) {
    return axios.post(base_URL + "/signup", userDetails)
      .then(
        (res) => res.status === 200 ? (localStorage.setItem("token", res.data.token), signUpSucces(), localStorage.setItem('firstname', res.data.firstname), localStorage.setItem("sessionID", res.data._id),
          setAuthenticated(true)) : null
      )
      .catch(err => invalidFields('User with this email address exists already'))
  }
};

const SignIn = (userDetails, setAuthenticated) => {
  return axios.post(base_URL + "/login", userDetails)
    .then(
      (res) => res.status === 200 ? (localStorage.setItem("token", res.data.token), signInSuccess(), localStorage.setItem("firstname", res.data.firstname), localStorage.setItem("sessionID", res.data._id),
        setAuthenticated(true)) : null
    )
    .catch((err) => wrongCredentials("Wrong credentials"));
};

const getCookies = (setAuthenticated) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + token } }
  return axios.get(base_URL + "/", config)
    .then(res =>
      res.status === 200
        ? (setAuthenticated(true))
        : console.log("Couldn't authenticate")
    )
    .catch((err) => console.log(err));
};

const checkForAdmin = (setState, bool, bool2) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + token } }
  axios.get(base_URL +  '/upload', config)
    .then(res => setState(bool))
    .catch(err => setState(bool2))
}

const submitProfileChanges = (details, userDocument) => {
  if (checkFields(details) === true) {
    console.log('ho')
    axios.put(base_URL + `/profile/${userDocument._id}`, {
      details
    })
      .then(res => updatedProfile("Profile updated", "success"))
      .catch(err => updatedProfile("There was an issue updating your profile", "error"));
  }
}

export { Signup, SignIn, getCookies, validateEmail, validatePassword, checkForAdmin, submitProfileChanges };
