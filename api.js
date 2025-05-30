import axios from 'axios';

const api = axios.create({
  baseURL: 'https://curiosidadedapaz.onrender.com' 
});

export default api;
