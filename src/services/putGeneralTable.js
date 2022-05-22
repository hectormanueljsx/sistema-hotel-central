import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const putGeneralTable = async (identifier, password, endpoint, id, generalData) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data, status } = await apiConfig.put(`${endpoint}/${id}`, generalData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default putGeneralTable;
