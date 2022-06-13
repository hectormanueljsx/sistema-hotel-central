import apiConfig from '@/api/apiConfig';

const getTokenUser = async (identifier, password) => {
  try {
    const { data: jwt } = await apiConfig.post('auth/local', { identifier, password });

    return jwt;
  } catch (error) {
    return error;
  }
};

export default getTokenUser;
