import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const postUsers = async (identifier, password, endpoint, dataUser, dataRole) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data, status } = await apiConfig.post(endpoint, dataUser, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const { role } = await apiConfig.put(`${endpoint}/${data.id}`, dataRole, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default postUsers;
