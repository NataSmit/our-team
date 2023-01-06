import axios from 'axios';

export const register = (mail: string, password: string) => axios.post('https://reqres.in/api/register', {
  email: mail,
  password,
});

export const login = (mail: string, password: string) => axios.post('https://reqres.in/api/login', {
  email: mail,
  password,
});
