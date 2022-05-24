import apiConfig from '@/api/apiConfig';

const postLogin = async (identifier, password) => {
  try {
    const {
      data: {
        user: {
          id,
          email,
          role: { name },
        },
      },
      status,
    } = await apiConfig.post('auth/local', { identifier, password });

    return { id, email, name, status };
  } catch (error) {
    return error;
  }
};

export default postLogin;
