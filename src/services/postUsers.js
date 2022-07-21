import apiConfig from '@/api/apiConfig';

const postUsers = async (endpoint, dataUser, dataRole) => {
  try {
    const jwt = localStorage.getItem('jwt');
    const { data, status } = await apiConfig.post(endpoint, dataUser, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { role } = await apiConfig.put(`${endpoint}/${data.id}`, dataRole, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default postUsers;
