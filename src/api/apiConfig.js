import axios from 'axios';

const apiConfig = axios.create({
  baseURL: 'https://strapi-hotelc.herokuapp.com/',
});

export default apiConfig;
