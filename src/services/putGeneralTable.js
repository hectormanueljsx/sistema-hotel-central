import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const putGeneralTable = async (identifier, password, endpoint, id, generalData) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data } = await apiConfig.put(`${endpoint}/${id}`, generalData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export { putGeneralTable };
