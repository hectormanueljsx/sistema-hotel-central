import apiConfig from '@/api/apiConfig';

const putUsers = async (endpoint, idUser, dataUser, dataRole) => {
  try {
    const jwt = localStorage.getItem('jwt');
    const { data, status } = await apiConfig.put(`${endpoint}/${idUser}`, dataUser, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { role } = await apiConfig.put(`${endpoint}/${idUser}`, dataRole, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default putUsers;
