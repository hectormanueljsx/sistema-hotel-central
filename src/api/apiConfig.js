import axios from 'axios';

const apiConfig = axios.create({
  baseURL: 'https://strapi-hotelcentral.herokuapp.com/',
});

export default apiConfig;
