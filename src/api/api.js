import axios from 'axios';

export const register = (mail, password) => {
  return axios.post('https://reqres.in/api/register', {
      email: mail,
      password: password
    })
}

export const login = (mail, password) => {
  return axios.post('https://reqres.in/api/login', {
    email: mail,
    password: password
  })
}