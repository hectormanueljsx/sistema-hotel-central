import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const getSpecificSelect = async (identifier, password, endpoint, attribute, valueAttribute) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data, status } = await apiConfig.get(`${endpoint}?${attribute}=${valueAttribute}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default getSpecificSelect;
