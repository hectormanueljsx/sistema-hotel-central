import axios from 'axios';

export default axios.create({
  baseURL: 'https://strapi-hotelcentral.herokuapp.com/',
});
