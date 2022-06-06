import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.5:1337/'
})

export default api;