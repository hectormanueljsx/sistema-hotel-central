import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const postGeneralTable = async (identifier, password, endpoint, generalData) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data, status } = await apiConfig.post(endpoint, generalData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default postGeneralTable;
