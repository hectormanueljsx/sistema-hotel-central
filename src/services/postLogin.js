import apiConfig from '@/api/apiConfig';

const postLogin = async (identifier, password) => {
  try {
    const {
      data: {
        jwt,
        user: {
          id,
          username,
          role: { name },
        },
      },
      status,
    } = await apiConfig.post('auth/local', { identifier, password });

    return { id, jwt, username, name, status };
  } catch (error) {
    return error;
  }
};

export default postLogin;
