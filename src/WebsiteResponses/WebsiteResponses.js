const Swal = require('sweetalert2');

const invalidFields = (message) => {
  return Swal.fire({
    title: 'Invalid fields',
    icon: 'error',
    confirmButtonText: message,
  })
}

const wrongCredentials = (message) => {
  return Swal.fire({
    title: 'Invalid fields',
    icon: 'error',
    confirmButtonText: message,
  })
}

const signUpSucces = () => {
  return Swal.fire({
    title: 'Signed Up',
    icon: 'success',
    timer: 1000,
    showConfirmButton: false,
  })
}

const signInSuccess = () => {
  return Swal.fire({
    title: 'Welcome back',
    icon: 'success',
    timer: 1000,
    showConfirmButton: false,
  })
}

const noResults = () => {
  return Swal.fire({
    title: 'No results',
    icon: 'error',
    showConfirmButton: false,
  })
}

const formIssue = (msg) => {
  return Swal.fire({
    title: msg,
    icon: 'error',
    timer: 1500,
    showConfirmButton: false,
  })
}

const petUploaded = (msg) => {
  return Swal.fire({
    title: msg,
    text: "redirecting...",
    icon: 'success',
    timer: 2500,
    showConfirmButton: false,
  })
}

const docDeleted = (msg) => {
  return Swal.fire({
    title: msg,
    text: "redirecting...",
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
  })
}

const updatedProfile = (msg, icon) => {
  return Swal.fire({
    title: msg,
    icon: icon,
    timer: 1500,
    showConfirmButton: false,
  })
}

export { invalidFields, wrongCredentials, signUpSucces, signInSuccess, noResults, petUploaded, docDeleted, formIssue, updatedProfile };