import apiConfig from '../api/apiConfig';
import getTokenUser from './getTokenUser';

const putUsers = async (identifier, password, dataUser, dataRole) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data } = await apiConfig.put(`${endpoint}/${id_user}`, dataUser, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const { role } = await apiConfig.put(`${endpoint}/${id_user}`, dataRole, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export { putUsers };
