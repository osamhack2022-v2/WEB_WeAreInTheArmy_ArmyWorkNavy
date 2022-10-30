import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://waita-be.herokuapp.com/',
  withCredentials: true,
});
