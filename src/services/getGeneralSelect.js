import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const getGeneralSelect = async (identifier, password, endpoint) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data } = await apiConfig.get(endpoint, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default getGeneralSelect;
