import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const deleteGeneralTable = async (identifier, password, endpoint, id) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data } = await apiConfig.delete(`${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export default deleteGeneralTable;
