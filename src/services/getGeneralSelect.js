import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const getGeneralSelect = async (identifier, password, endpoint) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data, status } = await apiConfig.get(endpoint, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default getGeneralSelect;
