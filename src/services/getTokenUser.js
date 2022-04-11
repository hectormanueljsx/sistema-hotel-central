import apiConfig from '../api/ApiConfig';

const getTokenUser = async (identifier, password) => {
  try {
    const { data } = await apiConfig.post('auth/local', { identifier, password });

    return data.jwt;
  } catch (error) {
    return error;
  }
};

export default getTokenUser;
