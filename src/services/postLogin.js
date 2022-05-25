import apiConfig from '@/api/apiConfig';

const postLogin = async (identifier, password) => {
  try {
    const {
      data: {
        user: {
          id,
          email,
          username,
          role: { name },
        },
      },
      status,
    } = await apiConfig.post('auth/local', { identifier, password });

    return { id, email, username, name, status };
  } catch (error) {
    return error;
  }
};

export default postLogin;
