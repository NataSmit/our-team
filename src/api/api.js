import axios from 'axios';

export const register = (mail, password) => axios.post('https://reqres.in/api/register', {
  email: mail,
  password,
});

export const login = (mail, password) => axios.post('https://reqres.in/api/login', {
  email: mail,
  password,
});
