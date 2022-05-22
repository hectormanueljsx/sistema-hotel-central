import apiConfig from '@/api/apiConfig';

const postLogin = async (identifier, password) => {
  try {
    const {
      data: {
        jwt,
        user: {
          role: { name },
        },
      },
      status,
    } = await apiConfig.post('auth/local', { identifier, password });

    return { jwt, status, name };
  } catch (error) {
    return error;
  }
};

export default postLogin;
