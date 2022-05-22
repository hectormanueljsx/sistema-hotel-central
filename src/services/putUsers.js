import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const putUsers = async (identifier, password, endpoint, idUser, dataUser, dataRole) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data, status } = await apiConfig.put(`${endpoint}/${idUser}`, dataUser, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const { role } = await apiConfig.put(`${endpoint}/${idUser}`, dataRole, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default putUsers;
